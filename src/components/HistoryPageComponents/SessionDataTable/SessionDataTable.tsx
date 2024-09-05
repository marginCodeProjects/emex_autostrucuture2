import React, { useEffect, useState } from 'react';
import { Table, Pagination, PaginationProps, ConfigProvider } from 'antd';
import { historyTexts } from '../../Other/LanguageProvider/languages';
import { useLanguage } from '../../Other/LanguageProvider/useLanguage';
import { GetFileData } from '../../../api/FilesService';
import { useAuth } from '../../Other/authContext/useAuth';
import styles from './SessionDataTable.module.css';

interface SessionDataTableProps {
    fileId: number | undefined;
}

interface DataType {
    key: React.Key;
    article: string;
    name: string;
    brand: string;
    article1: string;
    quantity: number;
    price: string;
    batch: string;
    NDS: string;
    bestPrice: string;
    logo: string;
    deliveryTime: string;
    newPrice: string;
}

const SessionDataTable: React.FC<SessionDataTableProps> = ({ fileId }) => {
    const { language } = useLanguage();
    const { token } = useAuth();
    const [tableData, setTableData] = useState<DataType[]>([]);
    const [limit, setLimit] = useState(10);
    const [skip, setSkip] = useState(0);

    const columns = [
        { title: historyTexts[language].article, dataIndex: 'article', key: 'article' },
        { title: historyTexts[language].name, dataIndex: 'name', key: 'name' },
        { title: historyTexts[language].brand, dataIndex: 'brand', key: 'brand' },
        { title: historyTexts[language].article1, dataIndex: 'article1', key: 'article1' },
        { title: historyTexts[language].quantity, dataIndex: 'quantity_goods', key: 'quantity' },
        { title: historyTexts[language].price, dataIndex: 'price', key: 'price' },
        { title: historyTexts[language].batch, dataIndex: 'batch', key: 'batch' },
        { title: historyTexts[language].NDS, dataIndex: 'NDS', key: 'NDS' },
        { title: historyTexts[language].bestPrice, dataIndex: 'best_price', key: 'bestPrice' },
        { title: historyTexts[language].logo, dataIndex: 'logo', key: 'logo' },
        { title: historyTexts[language].deliveryTime, dataIndex: 'delivery', key: 'deliveryTime' },
        { title: historyTexts[language].quantity, dataIndex: 'quantity_goods', key: 'quantity' },
        { title: historyTexts[language].newPrice, dataIndex: 'price_with_logo', key: 'newPrice' },
    ];

    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        setLimit(pageSize);
        setSkip((current - 1) * pageSize);
    };

    useEffect(() => {
        const GetData = async () => {
            const data = await GetFileData(token, fileId, skip, limit);
            if (data.success && data.files) {
                setTableData(data.files.map((file: any, index: number) => ({
                    key: index,
                    ...file
                })));
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
                        borderColor:'#335ae6',
                        headerBg:"#C9D4F9"
                    },
                },
            }}
        >

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
                        total={1000}
                        pageSize={limit}
                    />
                </div>
            </div>

        </ConfigProvider>
    );
};

export default SessionDataTable;