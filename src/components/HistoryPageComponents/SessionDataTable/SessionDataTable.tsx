import React, { useEffect, useState } from 'react';
import { Table, Pagination, PaginationProps, ConfigProvider, message } from 'antd';
import { historyTexts } from '../../Other/LanguageProvider/languages';
import { useLanguage } from '../../Other/LanguageProvider/useLanguage';
import { GetFileData } from '../../../api/FilesService';
import { useAuth } from '../../Other/authContext/useAuth';
import styles from './SessionDataTable.module.css';
import { SessionDataTableProps, SessionTableRowData } from '../../../interfaces/Main';


const SessionDataTable: React.FC<SessionDataTableProps> = ({ fileId }) => {
    const { language } = useLanguage();
    const { token } = useAuth();
    const [messageApi, contextHolder] = message.useMessage();
    const [tableData, setTableData] = useState<SessionTableRowData[]>([]);
    const [limit, setLimit] = useState(10);
    const [skip, setSkip] = useState(0);
    const [rowsLen, setRowsLen] = useState(0)

    const errorMessage = (message: string) => {
        messageApi.open({
            type: 'error',
            content: message
        });
    };
    const columns = [
        { title: historyTexts[language].article, dataIndex: 'article', key: 'article' },
        { title: historyTexts[language].name, dataIndex: 'name', key: 'name' },
        { title: historyTexts[language].brand, dataIndex: 'brand', key: 'brand' },
        { title: historyTexts[language].article1, dataIndex: 'article1', key: 'article1' },
        { title: historyTexts[language].quantity, dataIndex: 'quantity', key: 'quantity' },
        { title: historyTexts[language].price, dataIndex: 'price', key: 'price' },
        { title: historyTexts[language].batch, dataIndex: 'batch', key: 'batch' },
        { title: historyTexts[language].NDS, dataIndex: 'nds', key: 'NDS' },
        { title: historyTexts[language].bestPrice, dataIndex: 'best_price', key: 'bestPrice' },
        { title: historyTexts[language].logo, dataIndex: 'logo', key: 'logo' },
        { title: historyTexts[language].deliveryTime, dataIndex: 'delivery_time', key: 'deliveryTime' },
        { title: historyTexts[language].quantity, dataIndex: 'quantity', key: 'quantity' },
        { title: historyTexts[language].newPrice, dataIndex: 'new_price', key: 'newPrice' },
        { title: historyTexts[language].priceAfterCalculation, dataIndex: 'after_vat_price', key: 'newPrice' },
    ];

    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        setLimit(pageSize);
        setSkip((current - 1) * pageSize);
    };

    useEffect(() => {
        const GetData = async () => {
            const { success, rows, totalRows, message } = await GetFileData(token, fileId, skip, limit, language);
            if (success && rows) {
                setRowsLen(totalRows)
                setTableData(rows.map((file: any, index: number) => ({
                    key: index,
                    ...file
                })));
            } else if (message) {
                errorMessage(message)

            }
        };
        GetData();
    }, [fileId, skip, limit, token]);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        cellPaddingInline: 14,
                        borderColor: '#335ae6',
                        headerBg: "#C9D4F9",
                        fontFamily: 'Inter', headerBorderRadius: 8
                    },
                },
            }}
        >
            {contextHolder}
            <div className={styles.TableContainer}>
                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    rowKey="key"
                    className={styles.Table}
                />
                <div className={styles.PaginationContainer}>
                    <Pagination
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}
                        onChange={onShowSizeChange}
                        defaultCurrent={1}
                        total={rowsLen}
                        pageSize={limit}
                    />
                </div>
            </div>

        </ConfigProvider>
    );
};

export default SessionDataTable;