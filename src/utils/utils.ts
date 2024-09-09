export const toggleControlItem = (index: number, event: React.MouseEvent, setCard: React.Dispatch<React.SetStateAction<number | true | null>>, setIsVisible: React.Dispatch<React.SetStateAction<number | null | undefined>>,setMenuPosition:React.Dispatch<React.SetStateAction<{
    left: number;
    top: number;
}>>,isVisible:number|null|undefined) => {
    setCard(index);
    setIsVisible(isVisible === index ? null : index);

    // Получаем координаты кнопки
    const button = event.currentTarget as HTMLElement;
    const buttonRect = button.getBoundingClientRect();

    // Устанавливаем координаты меню на 100px правее кнопки
    setMenuPosition({
      left: buttonRect.right + 50,
      top: buttonRect.top - 20
    });
  };


