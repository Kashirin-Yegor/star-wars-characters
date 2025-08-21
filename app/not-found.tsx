import Link from "next/link";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-8">
        <h2>Страница не найдена</h2>
        <p className="text-muted-foreground mt-2">
          Запрашиваемая страница не существует.
        </p>
        <Button asChild className="mt-4">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться на главную
          </Link>
        </Button>
      </div>
    </div>
  );
}