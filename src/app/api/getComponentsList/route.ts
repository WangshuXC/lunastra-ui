import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const demoFilePath = path.join(process.cwd(), "src/app/components/(demos)");

    // 读取目录内容
    const items = await fs.readdir(demoFilePath);

    // 过滤出目录
    const directories = await Promise.all(
      items.map(async (item) => {
        const itemPath = path.join(demoFilePath, item);
        const stat = await fs.stat(itemPath);
        return stat.isDirectory() ? item : null;
      })
    );

    // 过滤掉 null 值
    const componentsList = directories.filter((dir): dir is string => dir !== null);

    // 返回目录列表
    return NextResponse.json({ componentsList });
  } catch (error) {
    console.error('Error reading directory:', error);
    return NextResponse.json(
      { error: 'Failed to read directory' },
      { status: 500 }
    );
  }
}