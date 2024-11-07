
import { getAccessToken } from '@auth0/nextjs-auth0';
import { NextRequest,NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Obtiene el token de acceso
    const res = new NextResponse()
    const { accessToken } = await getAccessToken(req, res);

    return NextResponse.json({accessToken})
  } catch (error: any) {
    // Maneja el error si algo sale mal
    return NextResponse.json({ error: error.message });
  }
}
