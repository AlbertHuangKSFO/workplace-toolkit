'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ArrowLeftRight, Languages, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const translationModes = [
  { value: 'jargon-to-plain', label: '黑话 → 人话（翻译成正常表达）' },
  { value: 'plain-to-jargon', label: '人话 → 黑话（包装成职场用语）' },
];

const jargonExamples = {
  'jargon-to-plain': '例如：我们需要赋能业务，形成闭环，提升颗粒度...',
  'plain-to-jargon': '例如：这个方案不行，需要重新做，时间很紧...',
};

function JargonTranslator(): React.JSX.Element {
  const [inputText, setInputText] = useState<string>('');
  const [translationMode, setTranslationMode] = useState<string>('jargon-to-plain');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!inputText.trim()) {
      setError('请输入需要翻译的内容！');
      setTranslatedText('');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTranslatedText('');

    const selectedMode = translationModes.find(m => m.value === translationMode);
    let userPrompt = '';

    if (translationMode === 'jargon-to-plain') {
      userPrompt = `请将以下职场黑话翻译成通俗易懂的人话：\n\n${inputText}`;
    } else {
      userPrompt = `请将以下直白的表达包装成职场黑话/专业用语：\n\n${inputText}`;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: userPrompt }],
          toolId: 'jargon-translator',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: '翻译失败，可能是AI的黑话词典需要更新了。' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.assistantMessage) {
        setTranslatedText(data.assistantMessage);
      } else {
        console.warn('Unexpected API response structure for jargon translation:', data);
        setError('AI返回的翻译结果有点奇怪，我暂时理解不了...🤖');
      }
    } catch (e) {
      console.error('Failed to translate jargon:', e);
      setError(e instanceof Error ? e.message : '翻译时发生未知错误，我的翻译引擎卡壳了！🔧');
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
        <Languages className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mr-2" />
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-600 dark:text-sky-400">黑话翻译器</h1>
        <Languages className="w-8 h-8 text-yellow-600 dark:text-yellow-400 ml-2" />
      </div>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <Label htmlFor="translationMode" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            翻译方向：
          </Label>
          <Select value={translationMode} onValueChange={setTranslationMode}>
            <SelectTrigger className={cn(
              "w-full",
              "bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700",
              "focus:ring-sky-500 focus:border-sky-500 dark:focus:ring-sky-500 dark:focus:border-sky-500"
            )}>
              <SelectValue placeholder="选择翻译方向..." />
            </SelectTrigger>
            <SelectContent className={cn(
              "border-neutral-200 dark:border-neutral-700",
              "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            )}>
              {translationModes.map(mode => (
                <SelectItem
                  key={mode.value}
                  value={mode.value}
                  className={cn(
                    "hover:bg-neutral-100 dark:hover:bg-neutral-700",
                    "focus:bg-sky-100 dark:focus:bg-sky-700"
                  )}
                >
                  {mode.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="inputText" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            输入需要翻译的内容：
          </Label>
          <Textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={jargonExamples[translationMode as keyof typeof jargonExamples]}
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
            "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-500 dark:hover:bg-yellow-600"
          )}
        >
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> AI正在翻译中...
            </>
          ) : (
            <><ArrowLeftRight className="mr-2 h-4 w-4" /> 开始翻译！
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
            <CardTitle className="text-red-700 dark:text-red-400">翻译失败！</CardTitle>
          </CardHeader>
          <CardContent className="text-red-600 dark:text-red-300">
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {isLoading && !translatedText && (
         <div className="text-center py-10 flex-grow flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-yellow-600 dark:text-yellow-400 mb-4" />
          <p className="text-neutral-500 dark:text-neutral-400">AI翻译官正在破解职场密码...🔍</p>
        </div>
      )}

      {translatedText && !isLoading && (
        <Card className={cn(
          "flex-grow flex flex-col shadow-inner",
          "bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
        )}>
          <CardHeader>
            <CardTitle className="text-yellow-700 dark:text-yellow-400 flex items-center">
              <ArrowLeftRight className="w-5 h-5 mr-2" /> 翻译结果：
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none break-words max-h-[600px] overflow-y-auto p-4 sm:p-6 text-neutral-800 dark:text-neutral-200">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{translatedText}</ReactMarkdown>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default JargonTranslator;
