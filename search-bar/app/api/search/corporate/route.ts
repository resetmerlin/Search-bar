import { Corporate, connnectDB } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const code = req.nextUrl.searchParams.get('code');

    await connnectDB();

    if (typeof code !== 'string') {
      return NextResponse.json(
        { error: 'code parameter must be a string' },
        { status: 400 }
      );
    }

    if (!code.length) {
      return NextResponse.json({ error: 'Please type code' }, { status: 400 });
    }
    // Reason for this RegExp => to Enhance UX
    const query = { 종목코드: code };

    const corporates = await Corporate.find(query);

    return NextResponse.json(corporates);
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
};
