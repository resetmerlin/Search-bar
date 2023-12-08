import { ICorporate } from '@/lib';
import React from 'react';

type IProps = {
  corporate: ICorporate;
};

export default function CorporateTable({ corporate }: IProps) {
  return (
    <div className="text-xs w-72">
      <div className="border-t-2 border-b-2 p-1 flex justify-between">
        <span>회사명:</span>
        <span>{corporate?.회사명}</span>
      </div>
      <div className="border-b-2 p-1  flex justify-between">
        <span>종목코드:</span>
        <span>{corporate?.종목코드}</span>
      </div>
      <div className="border-b-2 p-1  flex justify-between">
        <span>업종:</span>
        <span>{corporate?.업종}</span>
      </div>
      <div className="border-b-2 p-1  flex justify-between">
        <span>주요제품:</span>
        <span>{corporate?.주요제품}</span>
      </div>
      <div className="border-b-2 p-1  flex justify-between">
        <span>상장일:</span>
        <span>{corporate?.상장일}</span>
      </div>
      <div className="border-b-2 p-1  flex justify-between">
        <span>결산월:</span>
        <span>{corporate?.결산월}</span>
      </div>

      <div className="border-b-2 p-1  flex justify-between">
        <span>대표자명:</span>
        <span>{corporate?.대표자명}</span>
      </div>

      <div className="border-b-2 p-1  flex justify-between">
        <span>홈페이지:</span>
        <span>{corporate?.홈페이지}</span>
      </div>

      <div className="border-b-2 p-1  flex justify-between">
        <span>지역:</span>
        <span>{corporate?.지역}</span>
      </div>
    </div>
  );
}
