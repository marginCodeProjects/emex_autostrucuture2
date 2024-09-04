import { useState, useEffect } from 'react';
import { PercentMessage, StatusMessage } from '../../interfaces/Main';
import { useAuth } from '../../components/Other/authContext/useAuth';



const useWebSocket = () => {
    const [status, setStatus] = useState<string>(''); // Изначально пустая строка
    const [inputPercent, setInputPercent] = useState<number>(0); // Изначально 0
    const [percentBannedList, setPercentBannedList] = useState<number>(0); // Изначально 0
    const { token } = useAuth();
    useEffect(() => {
        const wsStatus = new WebSocket(`wss://127.0.0.1:8000/v1/new_parser/websocket_status/${token}`);

        wsStatus.onmessage = (event: MessageEvent) => {
            const data: StatusMessage = JSON.parse(event.data);
            setStatus(data.Status);
        };


        const wsPercent = new WebSocket(`wss://127.0.0.1:8000/v1/new_parser/websocket_percent/${token}`);
        wsPercent.onopen = () => {
            console.log('wsPercent connected');
        };
        wsPercent.onmessage = (event: MessageEvent) => {
            const data: PercentMessage = JSON.parse(event.data);

            setInputPercent(data.Percent_parsing_goods);
            setPercentBannedList(data.Percent_banned_list);
        };
        wsPercent.onerror = (error) => {
            console.error("WebSocket Percent Error: ", error);
        };

        return () => {
            wsStatus.close();
            wsPercent.close();
        };
    }, [token]);

    return { status, inputPercent, percentBannedList };
};
export default useWebSocket