import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ component: string }> }
) {
  try {
    // 确保 params 被解析
    const { component } = await params;

    // 构建文件路径
    const demoFilePath = path.join(
      process.cwd(),
      'src/app/components/(demos)/',
      component,
      'page.tsx'
    );
    const componentFilePath = path.join(
      process.cwd(),
      'src/components/ui/',
      component + '.tsx',
    );

    // 读取文件内容
    const demoFileContent = await fs.readFile(demoFilePath, 'utf-8');
    const componentFileContent = await fs.readFile(componentFilePath, 'utf-8');

    // 返回文件内容
    return NextResponse.json({ demoCode: demoFileContent, componentCode: componentFileContent });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json(
      { error: 'Failed to read component code' },
      { status: 500 }
    );
  }
}