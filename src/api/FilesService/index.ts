import { Files } from "../../interfaces/Main";

export async function GetFiles(token: string | null): Promise<{ success: boolean; files?: Files[]; message?: string }> {
  try {
    const response = await fetch(`https://api.forprojectstests.ru/v1/files/all_files`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': `${token}`
      },
    });

    if (response.ok) {
      // Парсим JSON только если запрос успешен
      const files: Files[] = await response.json();
      return { success: true, files };
    } else if(response.status ==404){
      
  
      return { success: false, message: 'Вы ещё не загружали файлы' };
    }
    else return { success: false, message: 'Ошибка сети или сервера' };
  } catch (error) {
    return { success: false, message: 'Ошибка сети или сервера' };
  }
}

export async function GetFilesBeforeParsing(token: string | null,file_id:number): Promise<{  file?: Blob;success?:boolean  }> {
    try {
      const response = await fetch(`https://api.forprojectstests.ru/v1/files/download_file/before_parsing/${file_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': `${token}`
        },
      });
  
      if (response.ok) {
        // Парсим JSON только если запрос успешен
        const file: Blob = await response.json();
        return { file };
      } else {
       
        return { success: false  };
      }
    } catch (error) {
      return { success: false };
    }
  }
  
  export async function GetFileAfterParsing(token: string | null,file_id:number): Promise<{ file?: Blob;success?:boolean }> {
    try {
        const response = await fetch(`https://api.forprojectstests.ru/v1/files/download_file/after_parsing/${file_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'access-token': `${token}`
          },
        });
    
        if (response.ok) {
          // Парсим JSON только если запрос успешен
          const file: Blob = await response.json();
          return { file };
        } else {
         
          return { success: false  };
        }
      } catch (error) {
        return { success: false };
      }
  }
  
    

  export async function GetFileData(token: string | null,file_id:number): Promise<{ success: boolean; files?: Files[]; message?: string }> {
    try {
      const response = await fetch(`https://api.forprojectstests.ru/v1/showing/show_data${file_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access-token': `${token}`
        },
      });
  
      if (response.ok) {
        // Парсим JSON только если запрос успешен
        const files: Files[] = await response.json();
        return { success: true, files };
      } else {
        const errorMessage = 'Ошибка запуска парсера';
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      return { success: false, message: 'Ошибка сети или сервера' };
    }
  }