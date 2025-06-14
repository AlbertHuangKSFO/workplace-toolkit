'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { AlertCircle, FileText, Loader2, Megaphone } from 'lucide-react';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const crisisTypes = [
  { value: 'data-breach', label: '数据泄露', emoji: '🔒', description: '客户信息或敏感数据泄露' },
  { value: 'service-outage', label: '服务中断', emoji: '⚡', description: '系统故障导致服务不可用' },
  { value: 'product-defect', label: '产品缺陷', emoji: '🔧', description: '产品质量问题或安全隐患' },
  { value: 'employee-misconduct', label: '员工不当行为', emoji: '👤', description: '员工违规或不当言行' },
  { value: 'financial-issue', label: '财务问题', emoji: '💰', description: '财务造假或资金链问题' },
  { value: 'legal-dispute', label: '法律纠纷', emoji: '⚖️', description: '诉讼或法律合规问题' },
  { value: 'negative-publicity', label: '负面舆情', emoji: '📰', description: '媒体负面报道或网络传言' },
  { value: 'partnership-conflict', label: '合作冲突', emoji: '🤝', description: '与合作伙伴的纠纷' },
];

const communicationChannels = [
  { value: 'internal-email', label: '内部邮件', emoji: '📧', description: '公司内部员工通知' },
  { value: 'public-statement', label: '公开声明', emoji: '📢', description: '对外公开发布的声明' },
  { value: 'media-response', label: '媒体回应', emoji: '📺', description: '回应媒体询问的声明' },
  { value: 'customer-notice', label: '客户通知', emoji: '👥', description: '向客户发送的通知' },
  { value: 'social-media', label: '社交媒体', emoji: '📱', description: '社交平台发布的内容' },
  { value: 'investor-letter', label: '投资者信函', emoji: '💼', description: '向投资者的正式信函' },
];

const toneStyles = [
  { value: 'apologetic', label: '道歉诚恳', emoji: '🙏', description: '承认错误，真诚道歉' },
  { value: 'explanatory', label: '解释说明', emoji: '📋', description: '详细解释情况和原因' },
  { value: 'reassuring', label: '安抚信心', emoji: '🛡️', description: '安抚情绪，重建信心' },
  { value: 'professional', label: '专业严谨', emoji: '🎯', description: '正式专业，事实为准' },
  { value: 'transparent', label: '透明坦诚', emoji: '🔍', description: '公开透明，坦诚沟通' },
  { value: 'solution-focused', label: '解决导向', emoji: '🔧', description: '聚焦解决方案和改进' },
];

function CrisisCommunicationTemplates(): React.JSX.Element {
  const [crisisType, setCrisisType] = useState<string>('service-outage');
  const [communicationChannel, setCommunicationChannel] = useState<string>('public-statement');
  const [toneStyle, setToneStyle] = useState<string>('apologetic');
  const [crisisDetails, setCrisisDetails] = useState<string>('');
  const [impactAssessment, setImpactAssessment] = useState<string>('');
  const [actionsTaken, setActionsTaken] = useState<string>('');
  const [generatedTemplate, setGeneratedTemplate] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!crisisDetails.trim()) {
      setError('请描述危机事件的具体情况！');
      setGeneratedTemplate('');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedTemplate('');

    const selectedCrisis = crisisTypes.find(c => c.value === crisisType);
    const selectedChannel = communicationChannels.find(c => c.value === communicationChannel);
    const selectedTone = toneStyles.find(t => t.value === toneStyle);

    const userPrompt = `
危机类型：${selectedCrisis?.label} - ${selectedCrisis?.description}
沟通渠道：${selectedChannel?.label} - ${selectedChannel?.description}
沟通语调：${selectedTone?.label} - ${selectedTone?.description}

危机详情：
${crisisDetails}

${impactAssessment.trim() ? `影响评估：${impactAssessment}` : ''}
${actionsTaken.trim() ? `已采取行动：${actionsTaken}` : ''}

请生成一份专业的危机公关沟通模板，包括标题、正文、关键信息点等。
`;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: userPrompt }],
          toolId: 'crisis-communication-templates',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: '模板生成失败，可能是危机公关专家在制定更好的策略。' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.assistantMessage) {
        setGeneratedTemplate(data.assistantMessage);
      } else {
        console.warn('Unexpected API response structure:', data);
        setError('AI返回的模板格式有误，危机公关专家可能在重新组织语言...📢');
      }
    } catch (e) {
      console.error('Failed to generate template:', e);
      setError(e instanceof Error ? e.message : '生成模板时发生未知错误，危机沟通需要更多时间准备！🚨');
    }

    setIsLoading(false);
  }

  return (
    <div className={cn(
      "p-4 sm:p-6 rounded-lg shadow-xl flex flex-col",
      "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
    )}>
      <div className="flex items-center justify-center mb-6 text-center">
        <Megaphone className="w-8 h-8 text-red-500 dark:text-red-400 mr-2" />
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-600 dark:text-sky-400">危机公关模板</h1>
        <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400 ml-2" />
      </div>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="crisisType" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              危机类型：
            </Label>
            <Select value={crisisType} onValueChange={setCrisisType}>
              <SelectTrigger className={cn(
                "w-full",
                "bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100",
                "focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500"
              )}>
                <SelectValue placeholder="选择危机类型..." />
              </SelectTrigger>
              <SelectContent className={cn(
                "border-neutral-200 dark:border-neutral-700",
                "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              )}>
                {crisisTypes.map(crisis => (
                  <SelectItem
                    key={crisis.value}
                    value={crisis.value}
                    className={cn(
                      "hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-red-100 dark:focus:bg-red-700/50",
                      "data-[state=checked]:bg-red-200 dark:data-[state=checked]:bg-red-600/50"
                    )}
                  >
                    <div className="flex flex-col">
                      <span>{crisis.emoji} {crisis.label}</span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">{crisis.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="communicationChannel" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              沟通渠道：
            </Label>
            <Select value={communicationChannel} onValueChange={setCommunicationChannel}>
              <SelectTrigger className={cn(
                "w-full",
                "bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100",
                "focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500"
              )}>
                <SelectValue placeholder="选择沟通渠道..." />
              </SelectTrigger>
              <SelectContent className={cn(
                "border-neutral-200 dark:border-neutral-700",
                "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              )}>
                {communicationChannels.map(channel => (
                  <SelectItem
                    key={channel.value}
                    value={channel.value}
                    className={cn(
                      "hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-red-100 dark:focus:bg-red-700/50",
                      "data-[state=checked]:bg-red-200 dark:data-[state=checked]:bg-red-600/50"
                    )}
                  >
                    <div className="flex flex-col">
                      <span>{channel.emoji} {channel.label}</span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">{channel.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="toneStyle" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              沟通语调：
            </Label>
            <Select value={toneStyle} onValueChange={setToneStyle}>
              <SelectTrigger className={cn(
                "w-full",
                "bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100",
                "focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500"
              )}>
                <SelectValue placeholder="选择沟通语调..." />
              </SelectTrigger>
              <SelectContent className={cn(
                "border-neutral-200 dark:border-neutral-700",
                "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              )}>
                {toneStyles.map(tone => (
                  <SelectItem
                    key={tone.value}
                    value={tone.value}
                    className={cn(
                      "hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-red-100 dark:focus:bg-red-700/50",
                      "data-[state=checked]:bg-red-200 dark:data-[state=checked]:bg-red-600/50"
                    )}
                  >
                    <div className="flex flex-col">
                      <span>{tone.emoji} {tone.label}</span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">{tone.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="crisisDetails" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            危机详情：
          </Label>
          <Textarea
            id="crisisDetails"
            value={crisisDetails}
            onChange={(e) => setCrisisDetails(e.target.value)}
            placeholder="详细描述危机事件的发生经过、涉及范围、严重程度等..."
            className={cn(
              "w-full min-h-[120px]",
              "bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700",
              "text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
              "focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500"
            )}
            rows={5}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="impactAssessment" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              影响评估（选填）：
            </Label>
            <Textarea
              id="impactAssessment"
              value={impactAssessment}
              onChange={(e) => setImpactAssessment(e.target.value)}
              placeholder="例如：对用户信任、品牌声誉、财务状况等可能造成的影响..."
              className={cn(
                "w-full min-h-[80px]",
                "bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700",
                "text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
                "focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500"
              )}
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="actionsTaken" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              已采取行动（选填）：
            </Label>
            <Textarea
              id="actionsTaken"
              value={actionsTaken}
              onChange={(e) => setActionsTaken(e.target.value)}
              placeholder="例如：已成立应急小组，正在调查原因，暂停相关服务..."
              className={cn(
                "w-full min-h-[80px]",
                "bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700",
                "text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
                "focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500"
              )}
              rows={3}
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full font-semibold",
            "bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600 dark:text-white",
            "disabled:bg-neutral-300 dark:disabled:bg-neutral-700 disabled:text-neutral-500 dark:disabled:text-neutral-400"
          )}
        >
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> 生成模板中...</>
          ) : (
            <><FileText className="mr-2 h-4 w-4" /> 生成公关模板</>
          )}
        </Button>
      </form>

      {error && (
        <Card className={cn(
          "mb-6",
          "border-red-400 bg-red-50 dark:border-red-500/50 dark:bg-red-900/30"
        )}>
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-400">生成失败！</CardTitle>
          </CardHeader>
          <CardContent className="text-red-600 dark:text-red-300">
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {isLoading && !generatedTemplate && (
        <div className="text-center py-10 flex-grow flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-red-500 dark:text-red-400 mb-4" />
          <p className="text-neutral-500 dark:text-neutral-400">危机公关专家正在紧急撰写模板...📢</p>
        </div>
      )}

      {generatedTemplate && !isLoading && (
        <Card className={cn(
          "flex-grow flex flex-col shadow-inner",
          "bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
        )}>
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400 flex items-center">
              <FileText className="w-5 h-5 mr-2" /> 危机沟通模板
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none break-words max-h-[600px] overflow-y-auto p-4 sm:p-6 text-neutral-800 dark:text-neutral-200">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{generatedTemplate}</ReactMarkdown>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default CrisisCommunicationTemplates;
