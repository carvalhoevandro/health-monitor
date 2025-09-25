"use client";

import {
  useEffect,
  useState,
} from 'react';

import {
  CheckCircle,
  Clock,
  RefreshCw,
  XCircle,
} from 'lucide-react';

import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface HealthStatus {
  url: string;
  name: string;
  status: "loading" | "success" | "error";
  message?: string;
  responseTime?: number;
  lastChecked?: Date;
}

const HEALTH_URLS = [
  {
    url: "https://checkout-api-stage.startse.com/health",
    name: "Checkout API",
    environment: "Stage"
  },
  {
    url: "https://checkout-api.startse.com/health",
    name: "Checkout API",
    environment: "Prod"
  },
  {
    url: "https://bff-api-dev.startse.com/health",
    name: "BFF API",
    environment: "Stage"
  },
  {
    url: "https://bff-api.startse.com/health",
    name: "BFF API",
    environment: "Prod"
  },
  {
    url: "https://auth-stage.startse.com/health",
    name: "Auth API",
    environment: "Stage"
  },
  {
    url: "https://auth.startse.com/health",
    name: "Auth API",
    environment: "Prod"
  },
  {
    url: "https://startse-platform-api-stage.startse.com/health",
    name: "Content API",
    environment: "Stage"
  },
  {
    url: "https://content-api.startse.com/health",
    name: "Content API",
    environment: "Prod"
  },
  {
    url: "https://dify-redirect.coolify-dev.startse.com/api/health-check",
    name: "Dify Redirect",
    environment: "Prod"
  },
  {
    url: "https://general-lms-api-dev.startse.com/health",
    name: "General LMS API",
    environment: "Stage"
  },
  {
    url: "https://general-lms-api.startse.com/health",
    name: "General LMS API",
    environment: "Prod"
  },
  {
    url: "https://identity-stage.startse.com/health",
    name: "Identity API",
    environment: "Stage"
  },
  {
    url: "https://identity.startse.com/health",
    name: "Identity API",
    environment: "Prod"
  },
  {
    url: "https://showcase-api-stage.startse.com/health",
    name: "Showcase API",
    environment: "Stage"
  },
  {
    url: "https://showcase-api.startse.com/health",
    name: "Showcase API",
    environment: "Prod"
  },
  {
    url: "https://squads-api-stage.startse.com/api/health",
    name: "Squads API",
    environment: "Stage"
  },
  {
    url: "https://squads-api.startse.com/api/health",
    name: "Squads API",
    environment: "Prod"
  },
  {
    url: "https://startseai-api-stage.startse.com/health",
    name: "StartSe AI API",
    environment: "Stage"
  },
  {
    url: "https://startseai-api.startse.com/health",
    name: "StartSe AI API",
    environment: "Prod"
  },
  {
    url: "https://strapi-cms-stage.startse.com/api/health",
    name: "Strapi",
    environment: "Stage"
  },
  {
    url: "https://cms-panel.startse.com/api/health",
    name: "Strapi",
    environment: "Prod"
  },
];

export default function HealthMonitor() {
  const [healthStatuses, setHealthStatuses] = useState<HealthStatus[]>(
    HEALTH_URLS.map(({ url, name }) => ({
      url,
      name,
      status: "loading" as const
    }))
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  const checkHealth = async (
    url: string,
    name: string
  ): Promise<HealthStatus> => {
    const startTime = Date.now();

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });

      const responseTime = Date.now() - startTime;

      if (response.ok) {
        let message = "Service is healthy";

        try {
          const data = await response.json();
          message =
            typeof data === "string" ? data : JSON.stringify(data, null, 2);
        } catch {
          message = `HTTP ${response.status} - ${response.statusText}`;
        }

        return {
          url,
          name,
          status: "success",
          message,
          responseTime,
          lastChecked: new Date()
        };
      } else {
        return {
          url,
          name,
          status: "error",
          message: `HTTP ${response.status} - ${response.statusText}`,
          responseTime,
          lastChecked: new Date()
        };
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      return {
        url,
        name,
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
        responseTime,
        lastChecked: new Date()
      };
    }
  };

  const checkAllHealth = async () => {
    setIsRefreshing(true);

    // Set all to loading state
    setHealthStatuses((prev) =>
      prev.map((status) => ({ ...status, status: "loading" as const }))
    );

    // Check each service
    const promises = HEALTH_URLS.map(({ url, name }) => checkHealth(url, name));

    try {
      const results = await Promise.all(promises);
      setHealthStatuses(results);
    } catch (error) {
      console.error("Error checking health:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    checkAllHealth();
  }, []);

  const getStatusIcon = (status: HealthStatus["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "loading":
        return <Clock className="h-5 w-5 text-yellow-500 animate-pulse" />;
    }
  };

  const getStatusBadge = (status: HealthStatus["status"]) => {
    switch (status) {
      case "success":
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 border-green-200"
          >
            Online
          </Badge>
        );
      case "error":
        return <Badge variant="destructive">Offline</Badge>;
      case "loading":
        return <Badge variant="secondary">Checking...</Badge>;
    }
  };

  const successCount = healthStatuses.filter(
    (s) => s.status === "success"
  ).length;
  const totalCount = healthStatuses.length;

  // Separa os serviços por ambiente
  const prodServices = healthStatuses.filter((_, index) => {
    const urlConfig = HEALTH_URLS[index];
    return urlConfig.environment === "Prod";
  });

  const stageServices = healthStatuses.filter((_, index) => {
    const urlConfig = HEALTH_URLS[index];
    return urlConfig.environment === "Stage";
  });

  const prodSuccessCount = prodServices.filter(s => s.status === "success").length;
  const stageSuccessCount = stageServices.filter(s => s.status === "success").length;

  const renderServiceCards = (services: HealthStatus[], urlConfigs: typeof HEALTH_URLS) => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((health, index) => {
        const originalIndex = healthStatuses.findIndex(h => h.url === health.url);
        const environment = HEALTH_URLS[originalIndex]?.environment;
        
        return (
          <Card key={health.url} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <CardTitle className="text-lg">{health.name}</CardTitle>
                  <Badge 
                    variant={environment === "Prod" ? "default" : "secondary"}
                    className={environment === "Prod" ? "bg-blue-100 text-blue-800 border-blue-200 w-fit" : "w-fit"}
                  >
                    {environment}
                  </Badge>
                </div>
                {getStatusIcon(health.status)}
              </div>
              <CardDescription className="text-sm break-all">
                {health.url}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  {getStatusBadge(health.status)}
                </div>

                {health.responseTime && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Tempo de resposta:
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {health.responseTime}ms
                    </span>
                  </div>
                )}

                {health.lastChecked && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Última verificação:
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {health.lastChecked.toLocaleTimeString("pt-BR")}
                    </span>
                  </div>
                )}

                {health.message && (
                  <div className="mt-3">
                    <span className="text-sm font-medium block mb-2">
                      Resposta:
                    </span>
                    <div className="bg-muted/50 border border-border p-3 rounded-md">
                      <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words max-h-32 overflow-y-auto">
                        {health.message}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Health Monitor
              </h1>
              <p className="text-muted-foreground mt-2">
                Monitoramento em tempo real do status de saúde das aplicações
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                onClick={checkAllHealth}
                disabled={isRefreshing}
                className="flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Atualizar
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              Status: {successCount}/{totalCount} serviços online
            </span>
            <span>•</span>
            <span>
              Produção: {prodSuccessCount}/{prodServices.length}
            </span>
            <span>•</span>
            <span>
              Stage: {stageSuccessCount}/{stageServices.length}
            </span>
            <span>•</span>
            <span>
              Última verificação: {new Date().toLocaleTimeString("pt-BR")}
            </span>
          </div>
        </div>

        {/* Abas para Ambientes */}
        <Tabs defaultValue="prod" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="prod" className="flex items-center gap-2 cursor-pointer">
              Produção
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {prodSuccessCount}/{prodServices.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="stage" className="flex items-center gap-2 cursor-pointer">
              Stage
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                {stageSuccessCount}/{stageServices.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prod" className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-semibold text-foreground">Ambiente de Produção</h2>
              <Badge variant="default" className="bg-blue-100 text-blue-800 border-blue-200">
                {prodSuccessCount}/{prodServices.length} serviços online
              </Badge>
            </div>
            {renderServiceCards(prodServices, HEALTH_URLS)}
          </TabsContent>

          <TabsContent value="stage" className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-semibold text-foreground">Ambiente de Stage</h2>
              <Badge variant="secondary">
                {stageSuccessCount}/{stageServices.length} serviços online
              </Badge>
            </div>
            {renderServiceCards(stageServices, HEALTH_URLS)}
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Monitor atualiza automaticamente ao carregar a página. Use o botão
            "Atualizar" para verificar novamente.
          </p>
        </div>
      </div>
    </div>
  );
}
