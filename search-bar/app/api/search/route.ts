import { Corporate, connnectDB } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const title = req.nextUrl.searchParams.get('title');

    await connnectDB();

    if (typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Title parameter must be a string' },
        { status: 400 }
      );
    }

    const query = { 회사명: new RegExp(title, 'i') };
    const corporates = await Corporate.find(query);

    return NextResponse.json(corporates);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
};
