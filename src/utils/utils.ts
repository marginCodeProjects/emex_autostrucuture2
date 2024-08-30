import { GetFileAfterParsing, GetFilesBeforeParsing } from "../api/FilesService";


export const calculateMarginPercent = (inputPercent: number) => {
    const minLeft = -10;
    const leftOffset = 930 * (inputPercent / 100);
    return minLeft + leftOffset;
};
export const handleDownloadFile = async (token: string|null, isBefore: boolean, file_id: number) => {
    let result;

    if (isBefore) {
        result = await GetFilesBeforeParsing(token, file_id);
    } else {
        result = await GetFileAfterParsing(token, file_id);
    }

    if (result.success && result.file) {
        const url = URL.createObjectURL(result.file);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'file.xlsx';


        document.body.appendChild(a);

        a.click();


        document.body.removeChild(a);


        URL.revokeObjectURL(url);
    } else {
        console.error('Ошибка при скачивании файла:', result.success ? 'Файл не найден' : 'Ошибка запроса');
    }
};