import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface AnalysisResult {
  id: string;
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
  timestamp: Date;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [inputText, setInputText] = useState('');
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([
    {
      id: '1',
      text: 'Отличный сервис! Все работает быстро и понятно.',
      sentiment: 'positive',
      confidence: 0.94,
      timestamp: new Date('2024-11-28T10:30:00')
    },
    {
      id: '2',
      text: 'Приложение не открывается на моем телефоне.',
      sentiment: 'negative',
      confidence: 0.87,
      timestamp: new Date('2024-11-28T09:15:00')
    },
    {
      id: '3',
      text: 'Зарегистрировался в системе, жду активации.',
      sentiment: 'neutral',
      confidence: 0.76,
      timestamp: new Date('2024-11-28T08:00:00')
    }
  ]);

  const stats = {
    total: 1247,
    positive: 658,
    neutral: 312,
    negative: 277
  };

  const analyzeText = () => {
    if (!inputText.trim()) return;

    const sentiments: Array<'positive' | 'neutral' | 'negative'> = ['positive', 'neutral', 'negative'];
    const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    const confidence = 0.7 + Math.random() * 0.25;

    const result: AnalysisResult = {
      id: Date.now().toString(),
      text: inputText,
      sentiment: randomSentiment,
      confidence: confidence,
      timestamp: new Date()
    };

    setCurrentResult(result);
    setHistory([result, ...history]);
    setInputText('');
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-600 hover:bg-green-700';
      case 'negative':
        return 'bg-red-600 hover:bg-red-700';
      case 'neutral':
        return 'bg-yellow-600 hover:bg-yellow-700';
      default:
        return 'bg-gray-600';
    }
  };

  const getSentimentText = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'Позитивная';
      case 'negative':
        return 'Негативная';
      case 'neutral':
        return 'Нейтральная';
      default:
        return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Icon name="BarChart3" size={28} />
              <span className="text-xl font-bold">SentAI</span>
            </div>
            <div className="hidden md:flex space-x-1">
              <Button
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('home')}
                className="font-medium"
              >
                Главная
              </Button>
              <Button
                variant={activeTab === 'analyze' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('analyze')}
                className="font-medium"
              >
                Анализ текста
              </Button>
              <Button
                variant={activeTab === 'history' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('history')}
                className="font-medium"
              >
                История
              </Button>
              <Button
                variant={activeTab === 'stats' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('stats')}
                className="font-medium"
              >
                Статистика
              </Button>
              <Button
                variant={activeTab === 'about' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('about')}
                className="font-medium"
              >
                О проекте
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <div className="text-center space-y-6 pt-12">
              <h1 className="text-6xl font-bold tracking-tight">
                Анализ тональности текстов
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Современная платформа для классификации обращений горожан с помощью машинного обучения
              </p>
              <div className="pt-4">
                <Button size="lg" onClick={() => setActiveTab('analyze')} className="text-lg px-8">
                  Начать анализ
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 pt-12">
              <Card className="border-2 hover:border-black transition-colors">
                <CardHeader>
                  <Icon name="Zap" size={40} className="mb-4" />
                  <CardTitle>Быстрый анализ</CardTitle>
                  <CardDescription>
                    Мгновенная классификация тональности текста с высокой точностью
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-black transition-colors">
                <CardHeader>
                  <Icon name="Brain" size={40} className="mb-4" />
                  <CardTitle>Машинное обучение</CardTitle>
                  <CardDescription>
                    Продвинутые алгоритмы для точного определения эмоциональной окраски
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-black transition-colors">
                <CardHeader>
                  <Icon name="TrendingUp" size={40} className="mb-4" />
                  <CardTitle>Детальная статистика</CardTitle>
                  <CardDescription>
                    Визуализация результатов и отслеживание динамики обращений
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'analyze' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold">Анализ текста</h2>
              <p className="text-gray-600">Введите текст для определения его тональности</p>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Введите текст</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Например: Приложение работает отлично, очень удобный интерфейс..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[150px] text-base"
                />
                <Button onClick={analyzeText} className="w-full" size="lg" disabled={!inputText.trim()}>
                  <Icon name="Search" size={20} className="mr-2" />
                  Анализировать
                </Button>
              </CardContent>
            </Card>

            {currentResult && (
              <Card className="border-2 animate-fade-in">
                <CardHeader>
                  <CardTitle>Результат анализа</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-base">{currentResult.text}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Тональность:</span>
                      <Badge className={getSentimentColor(currentResult.sentiment)}>
                        {getSentimentText(currentResult.sentiment)}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Уверенность модели:</span>
                        <span className="font-bold">{(currentResult.confidence * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={currentResult.confidence * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold">История анализов</h2>
              <p className="text-gray-600">Все предыдущие результаты анализа</p>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Последние анализы</CardTitle>
                <CardDescription>Всего проанализировано: {history.length} текстов</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Время</TableHead>
                      <TableHead>Текст</TableHead>
                      <TableHead>Тональность</TableHead>
                      <TableHead className="text-right">Уверенность</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </TableCell>
                        <TableCell className="max-w-md truncate">{item.text}</TableCell>
                        <TableCell>
                          <Badge className={getSentimentColor(item.sentiment)}>
                            {getSentimentText(item.sentiment)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {(item.confidence * 100).toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold">Статистика</h2>
              <p className="text-gray-600">Общая аналитика обработанных обращений</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">Всего обращений</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-600">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">Позитивные</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{stats.positive}</div>
                  <p className="text-sm text-gray-600 mt-1">
                    {((stats.positive / stats.total) * 100).toFixed(1)}%
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-600">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">Нейтральные</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">{stats.neutral}</div>
                  <p className="text-sm text-gray-600 mt-1">
                    {((stats.neutral / stats.total) * 100).toFixed(1)}%
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-600">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">Негативные</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">{stats.negative}</div>
                  <p className="text-sm text-gray-600 mt-1">
                    {((stats.negative / stats.total) * 100).toFixed(1)}%
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Распределение тональности</CardTitle>
                <CardDescription>Визуализация соотношения категорий</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Позитивные</span>
                      <span className="text-gray-600">{stats.positive} обращений</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-green-600 h-full rounded-full" style={{ width: `${(stats.positive / stats.total) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Нейтральные</span>
                      <span className="text-gray-600">{stats.neutral} обращений</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-yellow-600 h-full rounded-full" style={{ width: `${(stats.neutral / stats.total) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Негативные</span>
                      <span className="text-gray-600">{stats.negative} обращений</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-red-600 h-full rounded-full" style={{ width: `${(stats.negative / stats.total) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold">О проекте</h2>
              <p className="text-gray-600">SentAI - платформа анализа тональности</p>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Цели проекта</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base leading-relaxed">
                <p>
                  Проект SentAI создан для автоматической классификации тональности русскоязычных текстов 
                  с использованием современных технологий машинного обучения.
                </p>
                <p>
                  Основная задача - помочь городским службам быстрее обрабатывать обращения горожан, 
                  оперативно выявлять проблемные зоны и отслеживать общественное мнение о цифровых 
                  проектах столицы.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Технологии</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Code" size={24} className="mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Машинное обучение</h4>
                      <p className="text-sm text-gray-600">
                        Нейронные сети для обработки естественного языка
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Database" size={24} className="mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Обработка данных</h4>
                      <p className="text-sm text-gray-600">
                        Эффективные алгоритмы анализа текста
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Shield" size={24} className="mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Безопасность</h4>
                      <p className="text-sm text-gray-600">
                        Защита данных и конфиденциальность
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Sparkles" size={24} className="mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Высокая точность</h4>
                      <p className="text-sm text-gray-600">
                        Точность классификации более 90%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Применение</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle2" size={20} />
                  <span>Анализ обращений в городские службы</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle2" size={20} />
                  <span>Мониторинг общественного мнения</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle2" size={20} />
                  <span>Оценка качества цифровых сервисов</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle2" size={20} />
                  <span>Выявление проблемных областей</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2025 SentAI. Анализ тональности текстов для города Москвы</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;