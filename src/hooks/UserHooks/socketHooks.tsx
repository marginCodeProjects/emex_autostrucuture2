import { useState, useEffect } from 'react';
import { PercentMessage, StatusMessage } from '../../interfaces/Main';

interface UseWebSocketProps {
    setFile: (file: string) => void;
}

export const useWebSocket = ({ setFile }: UseWebSocketProps) => {
    const [status, setStatus] = useState<string>('');
    const [inputPercent, setInputPercent] = useState<number>(0);
    const [percentBannedList, setPercentBannedList] = useState<number>(0);

    useEffect(() => {
        const wsStatus = new WebSocket("wss://api.forprojectstests.ru/v1/new_parser/websocket_status");
        wsStatus.onmessage = (event: MessageEvent) => {
            const data: StatusMessage = JSON.parse(event.data);
            setStatus(data.status);
        };

        const wsPercent = new WebSocket("wss://api.forprojectstests.ru/v1/new_parser/websocket_percent");
        wsPercent.onmessage = (event: MessageEvent) => {
            const data: PercentMessage = JSON.parse(event.data);
            if (data.Start_file != null) {
                setFile(data.Start_file);
            }
            setInputPercent(data.Percent_parsing_goods);
            setPercentBannedList(data.Percent_banned_list);
        };

        return () => {
            wsStatus.close();
            wsPercent.close();
        };
    }, [setFile]);

    return { status, inputPercent, percentBannedList };
};