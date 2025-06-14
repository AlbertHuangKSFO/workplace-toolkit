'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Loader2, VenetianMask, Zap } from 'lucide-react'; // Zap for sparkle/enhance action
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// TODO: Implement the actual UI and logic for Weekly Report Sparkle Enhancer
function WeeklyReportSparkleEnhancer(): React.JSX.Element {
  const [reportContent, setReportContent] = useState<string>('');
  const [enhancedReport, setEnhancedReport] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reportContent.trim()) {
      setError('总得告诉我你这周干了啥，我才能帮你包装呀！✍️');
      setEnhancedReport('');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEnhancedReport('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: reportContent }],
          toolId: 'weekly-report-sparkle-enhancer',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: '周报包装失败，可能是亮点太多，AI处理不过来了。' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.assistantMessage) {
        setEnhancedReport(data.assistantMessage);
      } else {
        console.warn('Unexpected API response structure for enhanced report:', data);
        setError('AI返回的包装成果有点迷，我暂时解读不了...😵‍💫');
      }
    } catch (e) {
      console.error('Failed to fetch enhanced report:', e);
      setError(e instanceof Error ? e.message : '包装周报时发生未知错误，我的辞藻库可能需要更新了！📚');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn(
      "p-4 sm:p-6 rounded-lg shadow-xl flex flex-col",
      "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
    )}>
      <div className="flex items-center justify-center mb-6 text-center">
        <VenetianMask className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-2" />
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-600 dark:text-sky-400">"这周干了啥"亮点包装器</h1>
        <VenetianMask className="w-8 h-8 text-purple-600 dark:text-purple-400 ml-2" />
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="reportContent" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            把你这周平平无奇的工作内容粘贴进来，AI来帮你点石成金！✨
          </label>
          <Textarea
            id="reportContent"
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            placeholder="例如：\n- 开了5个会\n- 回了50封邮件\n- 写了500行代码\n- 和产品经理沟通了5次..."
            className={cn(
              "w-full min-h-[120px]",
              "bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700",
              "focus:ring-sky-500 focus:border-sky-500 dark:focus:ring-sky-500 dark:focus:border-sky-500"
            )}
            rows={5}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full text-white",
            "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
          )}
        >
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> 亮点提取 & 魔法包装中...
            </>
          ) : (
            <><Zap className="mr-2 h-4 w-4" /> 一键包装，闪亮登场！
            </>
          )}
        </Button>
      </form>

      {error && (
        <Card className={cn(
          "mb-6",
          "border-red-400 bg-red-50 dark:border-red-500/50 dark:bg-red-900/30"
        )}>
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-400">包装出错了！</CardTitle>
          </CardHeader>
          <CardContent className="text-red-600 dark:text-red-300">
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {isLoading && !enhancedReport && (
         <div className="text-center py-10 flex-grow flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-500 dark:text-purple-400 mb-4" />
          <p className="text-neutral-500 dark:text-neutral-400">AI正在精心打磨您的周报，力求惊艳老板...✨</p>
        </div>
      )}

      {enhancedReport && !isLoading && (
        <Card className={cn(
          "flex-grow flex flex-col shadow-inner",
          "bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
        )}>
          <CardHeader>
            <CardTitle className="text-purple-700 dark:text-purple-400 flex items-center">
              <VenetianMask className="w-5 h-5 mr-2" /> 周报亮点闪亮登场！
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none break-words max-h-[600px] overflow-y-auto p-4 sm:p-6 text-neutral-800 dark:text-neutral-200">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{enhancedReport}</ReactMarkdown>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default WeeklyReportSparkleEnhancer;
