"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WifiOff, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <WifiOff className="w-8 h-8 text-slate-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">
            You&apos;re Offline
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-slate-600">
              It looks like you&apos;re not connected to the internet.
            </p>
            <p className="text-sm text-slate-500">
              Don&apos;t worry! You can still access previously visited pages
              and cached content.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => window.location.reload()}
              className="w-full"
              variant="default"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <Link href="/" className="block">
              <Button variant="outline" className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold text-slate-900 mb-2">
              Available Offline:
            </h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Previously visited pages</li>
              <li>• Cached liturgical texts</li>
              <li>• Downloaded book images</li>
              <li>• Basic app functionality</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
