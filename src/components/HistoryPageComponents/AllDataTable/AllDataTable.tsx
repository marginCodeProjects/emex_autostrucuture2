import React, { useState, useEffect } from "react";
import { Table, Space, Checkbox, Button, Popover, message, Spin } from "antd";
import { useAuth } from "../../Other/authContext/useAuth";
import { useLanguage } from "../../Other/LanguageProvider/useLanguage";
import { historyTexts } from "../../../components/Other/LanguageProvider/languages";
import { DeleteFiles, GetFiles } from "../../../api/FilesService";
import styles from "./AllDataTable.module.css";
import { AllDataTableProps, Files } from "../../../interfaces/Main";

interface DataType {
    key: number;
    id: number;
    date: string;
    new_filter_id: number | null;
    before_parsing_filename: string;
    filename_after_parsing: string | null;
    filename_after_parsing_without_nds: string | null;
    filename_after_parsing_with_nds: string | null;
}

const AllDataTable: React.FC<AllDataTableProps> = ({ setFileName, setFileType }) => {
    const { token } = useAuth();
    const { language } = useLanguage();
    const [files, setFiles] = useState<DataType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

    const get_files_handler = async () => {
        setLoading(true);
        const { success, files, message } = await GetFiles(token, language);
        setLoading(false);
        if (success) {
            const formattedFiles = files?.map((file: Files) => ({
                key: file.id,
                id: file.id,
                date: file.date.slice(0, 10),
                new_filter_id: file.new_filter_id,
                before_parsing_filename: file.before_parsing_filename,
                filename_after_parsing: file.filename_after_parsing,
                filename_after_parsing_without_nds: file.filename_after_parsing_without_nds,
                filename_after_parsing_with_nds: file.filename_after_parsing_with_nds,
            }));
            setFiles(formattedFiles || []);
        } else {
            disclamer(message);
        }
    };

    const disclamer = (message: string | undefined) => {
        messageApi.open({
            type: "warning",
            content: message,
        });
    };

    useEffect(() => {
        get_files_handler();
    }, []);

    const handleDeleteSelected = async () => {
        const { files, success, message } = await DeleteFiles(token, selectedIds, language)
        if (!success) {
            disclamer(message)
        } else {
            if (files) {
                const formattedFiles = files?.map((file: Files) => ({
                    key: file.id,
                    id: file.id,
                    date: file.date.slice(0, 10),
                    new_filter_id: file.new_filter_id,
                    before_parsing_filename: file.before_parsing_filename,
                    filename_after_parsing: file.filename_after_parsing,
                    filename_after_parsing_without_nds: file.filename_after_parsing_without_nds,
                    filename_after_parsing_with_nds: file.filename_after_parsing_with_nds,
                }));
                setFiles(formattedFiles || []);
                setSelectedIds([])
            }
        }
        messageApi.open({
            type: "success",
            content: `Выбрано для удаления: ${selectedIds.length} файлов.`,
        });
    };

    const handleCheckboxChange = (id: string, checked: boolean) => {
        setSelectedIds((prev) =>
            checked ? [...prev, id] : prev.filter((selectedId) => selectedId !== id)
        );
    };

    const afterParsingPopup = (
        id: number,
        url: string,
        fileName: string,
        fileType: 'filename_after_parsing' | 'filename_after_parsing_without_nds' | 'filename_after_parsing_with_nds'
    ) => (
        <div>
            <a
                href={`https://api-dev.autostructure.ru/v1/files/download_file/${url}/${id}`}
                className={`${styles.table__textsForLinks} ${styles.inter__medium}`}
            >
                {historyTexts[language].downloadFile}
            </a>
            <p
                className={`${styles.table__textsForLinks} ${styles.inter__medium}`}
                onClick={() => {
                    setFileName(fileName);
                    setFileType(fileType);
                }}
            >
                {historyTexts[language].viewFile}
            </p>
        </div>
    );

    const columns = [
        {
            title: "Выбрать",
            dataIndex: "id",
            key: "select",
            width: 100, // Фиксированная ширина
            render: (id: string) => (
                <Checkbox
                    onChange={(e) => handleCheckboxChange(id, e.target.checked)}
                />
            ),
        },
        {
            title: "Дата",
            dataIndex: "date",
            key: "date",
            width: 150, // Фиксированная ширина
        },
        {
            title: "Фильтры",
            dataIndex: "new_filter_id",
            key: "filters",
            width: 150,
        },
        {
            title: "Файл до обработки",
            dataIndex: "before_parsing_filename",
            key: "beforeParsing",
            width: 200,
            render: (text: string, record: DataType) => (
                <a
                    href={`https://api-dev.autostructure.ru/v1/files/download_file/before_parsing/${record.id}`}
                >
                    {text}
                </a>
            ),
        },
        {
            title: "Файлы после обработки",
            key: "afterParsing",
            width: 300, // Увеличенная ширина
            render: (_: any, record: DataType) =>
                record.filename_after_parsing ? (
                    <Space direction="vertical">
                        {["filename_after_parsing", "filename_after_parsing_without_nds", "filename_after_parsing_with_nds"].map(
                            (field, index) =>
                                record[field as keyof DataType] && (
                                    <Popover
                                        key={index}
                                        content={afterParsingPopup(
                                            record.id,
                                            field.replace("filename_", ""),
                                            record[field as keyof DataType] as string,
                                            field as 'filename_after_parsing' | 'filename_after_parsing_without_nds' | 'filename_after_parsing_with_nds'
                                        )}
                                    >
                                        <p className={`${styles.table__textsForLinks}`}>
                                            {record[field as keyof DataType]}
                                        </p>
                                    </Popover>
                                )
                        )}
                    </Space>
                ) : (
                    "-"
                ),
        },
    ];

    return (
        <>
            {contextHolder}
            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    <Table<DataType>
                        columns={columns}
                        dataSource={files || []}
                        rowKey="id"
                        pagination={{ pageSize: 5 }}
                    />
                    {selectedIds.length > 0 && <Button
                        type="primary"
                        danger
                        style={{ marginBottom: '20px' }}
                        onClick={handleDeleteSelected}
                    >
                        Удалить выбранное
                    </Button>}
                </>
            )}
        </>
    );
};

export default AllDataTable;