import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as http from 'http';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  test(): string {
    return 'test';
  }

  // 慢速接口
  @Get('slow')
  slow(): string {
    const startTime = Date.now();
    // 延迟 10s 执行
    while (Date.now() - startTime < 10000) {
      // 空循环用于延迟
    }
    return 'slow request';
  }

  // 快速接口
  @Get('fast')
  fast(): string {
    return 'fast request';
  }

  @Get('http-slow')
  async httpSlow(): Promise<string> {
    // 通过 node http 模块请求 slow 接口
    return new Promise((resolve, reject) => {
      let data = '';

      const req = http.request('http://localhost:3000/slow', (res) => {
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve(data);
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.end();
    });
  }
}

/**
const startTime = Date.now();
fetch('http://127.0.0.1:8888/http-slow').then(res => {
    console.log('http-slow 耗时: ', Date.now() - startTime);
})
fetch('http://127.0.0.1:8888/fast').then(res => {
    console.log('fast 耗时: ', Date.now() - startTime);
})
*/
