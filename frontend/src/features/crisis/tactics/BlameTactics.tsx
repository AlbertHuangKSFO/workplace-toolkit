'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { AlertTriangle, Loader2, Shield, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const tacticTypes = [
  { value: 'deflect', label: '转移责任', emoji: '🔄', description: '巧妙转移焦点，避免直接承担' },
  { value: 'share', label: '分散责任', emoji: '🤝', description: '强调团队协作，责任共担' },
  { value: 'minimize', label: '淡化影响', emoji: '📉', description: '降低问题严重性，减少关注' },
  { value: 'context', label: '情境解释', emoji: '📋', description: '提供背景信息，合理化结果' },
  { value: 'proactive', label: '主动承担', emoji: '🛡️', description: '适度承认，展现担当精神' },
  { value: 'solution', label: '解决导向', emoji: '🔧', description: '聚焦解决方案，淡化问题本身' },
];

const situationTypes = [
  { value: 'project-delay', label: '项目延期', emoji: '⏰', description: '项目进度落后于计划' },
  { value: 'budget-overrun', label: '预算超支', emoji: '💸', description: '成本控制出现问题' },
  { value: 'quality-issue', label: '质量问题', emoji: '🔍', description: '产品或服务质量不达标' },
  { value: 'team-conflict', label: '团队冲突', emoji: '⚡', description: '团队内部矛盾激化' },
  { value: 'client-complaint', label: '客户投诉', emoji: '😤', description: '客户对服务不满' },
  { value: 'missed-deadline', label: '错过截止日期', emoji: '📅', description: '未能按时完成任务' },
  { value: 'communication-failure', label: '沟通失误', emoji: '📞', description: '信息传达出现偏差' },
  { value: 'resource-shortage', label: '资源不足', emoji: '📦', description: '人力或物力资源短缺' },
];

const audienceLevels = [
  { value: 'peer', label: '同级同事', emoji: '🤝', description: '平级合作伙伴' },
  { value: 'subordinate', label: '下属团队', emoji: '👥', description: '直接汇报的团队成员' },
  { value: 'supervisor', label: '直接上级', emoji: '👔', description: '直接汇报的领导' },
  { value: 'senior-management', label: '高级管理层', emoji: '🎯', description: '公司高层领导' },
  { value: 'client', label: '外部客户', emoji: '🤝', description: '合作客户或甲方' },
  { value: 'stakeholder', label: '利益相关方', emoji: '🎪', description: '项目相关各方' },
];

function BlameTactics(): React.JSX.Element {
  const [tacticType, setTacticType] = useState<string>('deflect');
  const [situationType, setSituationType] = useState<string>('project-delay');
  const [audienceLevel, setAudienceLevel] = useState<string>('supervisor');
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [currentSituation, setCurrentSituation] = useState<string>('');
  const [desiredOutcome, setDesiredOutcome] = useState<string>('');
  const [generatedTactics, setGeneratedTactics] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!problemDescription.trim()) {
      setError('请描述遇到的问题情况！');
      setGeneratedTactics('');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedTactics('');

    const selectedTactic = tacticTypes.find(t => t.value === tacticType);
    const selectedSituation = situationTypes.find(s => s.value === situationType);
    const selectedAudience = audienceLevels.find(a => a.value === audienceLevel);

    const userPrompt = `
策略类型：${selectedTactic?.label} - ${selectedTactic?.description}
问题类型：${selectedSituation?.label} - ${selectedSituation?.description}
沟通对象：${selectedAudience?.label} - ${selectedAudience?.description}

问题描述：
${problemDescription}

${currentSituation.trim() ? `当前状况：${currentSituation}` : ''}
${desiredOutcome.trim() ? `期望结果：${desiredOutcome}` : ''}

请提供专业、得体、有效的沟通话术和策略建议，帮助妥善处理这个职场难题。注意要保持职业操守和道德底线。
`;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: userPrompt }],
          toolId: 'blame-tactics',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: '话术生成失败，可能是危机公关专家在思考更好的策略。' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.assistantMessage) {
        setGeneratedTactics(data.assistantMessage);
      } else {
        console.warn('Unexpected API response structure:', data);
        setError('AI返回的话术格式有误，危机公关专家可能在重新制定策略...🛡️');
      }
    } catch (e) {
      console.error('Failed to generate tactics:', e);
      setError(e instanceof Error ? e.message : '生成话术时发生未知错误，危机处理还需要更多智慧！⚡');
    }

    setIsLoading(false);
  }

  return (
    <div className={cn(
      "p-4 sm:p-6 rounded-lg shadow-xl flex flex-col",
      "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
    )}>
      <div className="flex items-center justify-center mb-6 text-center">
        <Shield className="w-8 h-8 text-orange-500 dark:text-orange-400 mr-2" />
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-600 dark:text-sky-400">甩锅/背锅话术</h1>
        <AlertTriangle className="w-8 h-8 text-orange-500 dark:text-orange-400 ml-2" />
      </div>

      <div className={cn(
        "mb-4 p-3 rounded-lg",
        "bg-amber-50 border border-amber-300 dark:bg-amber-900/40 dark:border-amber-500/50"
      )}>
        <p className={cn("text-sm", "text-amber-700 dark:text-amber-200")}>
          ⚠️ <strong>使用提醒：</strong>本工具旨在提供职场沟通策略，请在合法合规的前提下使用，保持职业操守和道德底线。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="tacticType" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              策略类型：
            </Label>
            <Select value={tacticType} onValueChange={setTacticType}>
              <SelectTrigger className={cn(
                "w-full",
                "bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100",
                "focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-500 dark:focus:border-orange-500"
              )}>
                <SelectValue placeholder="选择策略类型..." />
              </SelectTrigger>
              <SelectContent className={cn(
                "border-neutral-200 dark:border-neutral-700",
                "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              )}>
                {tacticTypes.map(tactic => (
                  <SelectItem
                    key={tactic.value}
                    value={tactic.value}
                    className={cn(
                      "hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-orange-100 dark:focus:bg-orange-700/50",
                      "data-[state=checked]:bg-orange-200 dark:data-[state=checked]:bg-orange-600/50"
                    )}
                  >
                    <div className="flex flex-col">
                      <span>{tactic.emoji} {tactic.label}</span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">{tactic.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="situationType" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              问题类型：
            </Label>
            <Select value={situationType} onValueChange={setSituationType}>
              <SelectTrigger className={cn(
                "w-full",
                "bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100",
                "focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-500 dark:focus:border-orange-500"
              )}>
                <SelectValue placeholder="选择问题类型..." />
              </SelectTrigger>
              <SelectContent className={cn(
                "border-neutral-200 dark:border-neutral-700",
                "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              )}>
                {situationTypes.map(situation => (
                  <SelectItem
                    key={situation.value}
                    value={situation.value}
                    className={cn(
                      "hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-orange-100 dark:focus:bg-orange-700/50",
                      "data-[state=checked]:bg-orange-200 dark:data-[state=checked]:bg-orange-600/50"
                    )}
                  >
                    <div className="flex flex-col">
                      <span>{situation.emoji} {situation.label}</span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">{situation.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="audienceLevel" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              沟通对象：
            </Label>
            <Select value={audienceLevel} onValueChange={setAudienceLevel}>
              <SelectTrigger className={cn(
                "w-full",
                "bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100",
                "focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-500 dark:focus:border-orange-500"
              )}>
                <SelectValue placeholder="选择沟通对象..." />
              </SelectTrigger>
              <SelectContent className={cn(
                "border-neutral-200 dark:border-neutral-700",
                "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              )}>
                {audienceLevels.map(audience => (
                  <SelectItem
                    key={audience.value}
                    value={audience.value}
                    className={cn(
                      "hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-orange-100 dark:focus:bg-orange-700/50",
                      "data-[state=checked]:bg-orange-200 dark:data-[state=checked]:bg-orange-600/50"
                    )}
                  >
                    <div className="flex flex-col">
                      <span>{audience.emoji} {audience.label}</span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">{audience.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="problemDescription" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            问题描述：
          </Label>
          <Textarea
            id="problemDescription"
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            placeholder="请具体描述您遇到的问题或挑战..."
            className={cn(
              "w-full min-h-[100px]",
              "bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700",
              "text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
              "focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-500 dark:focus:border-orange-500"
            )}
            rows={4}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="currentSituation" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              当前状况（选填）：
            </Label>
            <Textarea
              id="currentSituation"
              value={currentSituation}
              onChange={(e) => setCurrentSituation(e.target.value)}
              placeholder="例如：项目已延期X天，客户非常不满..."
              className={cn(
                "w-full min-h-[60px]",
                "bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700",
                "text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
                "focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-500 dark:focus:border-orange-500"
              )}
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="desiredOutcome" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              期望结果（选填）：
            </Label>
            <Textarea
              id="desiredOutcome"
              value={desiredOutcome}
              onChange={(e) => setDesiredOutcome(e.target.value)}
              placeholder="例如：争取理解，避免处罚，获得支持..."
              className={cn(
                "w-full min-h-[60px]",
                "bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700",
                "text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
                "focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-500 dark:focus:border-orange-500"
              )}
              rows={2}
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full font-semibold",
            "bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-500 dark:hover:bg-orange-600 dark:text-white",
            "disabled:bg-neutral-300 dark:disabled:bg-neutral-700 disabled:text-neutral-500 dark:disabled:text-neutral-400"
          )}
        >
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> 生成话术...</>
          ) : (
            <><Sparkles className="mr-2 h-4 w-4" /> 获取应对策略</>
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

      {isLoading && !generatedTactics && (
        <div className="text-center py-10 flex-grow flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-orange-500 dark:text-orange-400 mb-4" />
          <p className="text-neutral-500 dark:text-neutral-400">危机公关专家正在火速制定策略...🛡️</p>
        </div>
      )}

      {generatedTactics && !isLoading && (
        <Card className={cn(
          "flex-grow flex flex-col shadow-inner",
          "bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
        )}>
          <CardHeader>
            <CardTitle className="text-orange-600 dark:text-orange-400 flex items-center">
              <Shield className="w-5 h-5 mr-2" /> 应对策略与话术建议
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none break-words max-h-[600px] overflow-y-auto p-4 sm:p-6 text-neutral-800 dark:text-neutral-200">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{generatedTactics}</ReactMarkdown>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default BlameTactics;
