export const isWish = (id: string, wList: string[] | null): boolean => {
  return wList !== null && wList.includes(id);
};

export const isWishReq = (
  e: React.MouseEvent<HTMLElement>,
  id: string,
  setWlist: React.Dispatch<React.SetStateAction<string[]>>
): void => {
  const list = localStorage.getItem('wishList')
    ? JSON.parse(localStorage.getItem('wishList') as string)
    : [];
  if (!list.includes(id)) {
    list.push(id);
    localStorage.setItem('wishList', JSON.stringify(list));
    setWlist(list);
  }
};

export const unWishReq = (
  e: React.MouseEvent<HTMLElement>,
  id: string,
  setWlist: React.Dispatch<React.SetStateAction<string[]>>
): void => {
  const list = localStorage.getItem('wishList')
    ? JSON.parse(localStorage.getItem('wishList') as string)
    : [];
  const index = list.indexOf(id);
  if (index !== -1) {
    list.splice(index, 1);
    localStorage.setItem('wishList', JSON.stringify(list));
    setWlist(list);
  }
};

export const nextSlide = (
  totalImg: number,
  slide: number,
  setSlide: React.Dispatch<React.SetStateAction<number>>
): void => {
  if (slide === totalImg - 1) {
    setSlide(0);
  } else if (slide < totalImg - 1) {
    setSlide(slide + 1);
  }
};

export const prevSlide = (
  totalImg: number,
  slide: number,
  setSlide: React.Dispatch<React.SetStateAction<number>>
): void => {
  if (slide === 0) {
    setSlide(totalImg - 1);
  } else if (slide > 0) {
    setSlide(slide - 1);
  }
};
