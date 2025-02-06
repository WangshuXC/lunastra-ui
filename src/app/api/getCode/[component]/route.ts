import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { component: string } }
) {
  try {
    // 确保 params 被解析
    const { component } = await params;

    // 构建文件路径
    const filePath = path.join(
      process.cwd(),
      'src/app/components/(demos)/',
      component,
      'page.tsx'
    );

    // 读取文件内容
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // 返回文件内容
    return NextResponse.json({ code: fileContent });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json(
      { error: 'Failed to read component code' },
      { status: 500 }
    );
  }
}