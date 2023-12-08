export interface ICorporate {
  회사명: string;
  종목코드: number;
  업종: string;
  주요제품: string;
  상장일: string;
  결산월: string;
  대표자명: string;
  홈페이지: string;
  지역: string;
}

export type ICorporates = ICorporate[];
