"use client"

import { Card, Button, Badge } from 'react-bootstrap';
import { useState } from 'react';


import TitleBar from "@/components/TitleBar";

export default function ApiKey() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const keys = [
    {
      title: "env .local",
      value: "yhidvbjdallhgda5678484bbvuyy-377bjeybjshkghjwurskldmdhf",
      description: ""
    },
    {
      title: "env .local",
      value: "yhidvbjdallhgda5678484bbvuyy",
      description: "These are the same public and secret keys as you see below"
    },
    {
      title: "Publishable Key",
      value: "pk_test_51Oe...",
      description: "This key should be used in frontend code. It can be safely shared and does not need to be kept secret."
    },
    {
      title: "Public Key",
      value: "env.local[dff]tuu6755ejdqhhijhvhadyyyudh]34",
      description: ""
    },
    {
      title: "Secret Key",
      value: "sk_test_51Oe...",
      description: "Securely manage this sensitive key. Do not share it with anyone. If you suspect your secret key has been compromised, create a new key, update your code, then delete the compromised key."
    },
    {
      title: "Default Key",
      value: "env.local[dff]tuu6755ejdqhhijhvhadyyyudh]34",
      description: ""
    },
    {
      title: "Test",
      value: "env.local[dff]tuu6755ejdqhhijhvhadyyyudh]34",
      description: ""
    },
    {
      title: "Testing Token",
      value: "env.local[dff]tuu6755ejdqhhijhvhadyyyudh]34",
      description: ""
    }
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

    return (
        <>
            <div className="">
                <TitleBar title="Key ID:" />
                <div className="container mt-4">
      <h2 className="mb-4">Quick Copy</h2>
      <p className="mb-4">Choose your framework and paste the code into your environment file.</p>

      {keys.map((key, index) => (
        <Card key={index} className="mb-3 border-0 shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h5 className="mb-0">
                  {key.title.startsWith("env") ? (
                    <Badge bg="secondary" className="me-2">env</Badge>
                  ) : null}
                  {key.title.replace("env .local", "")}
                </h5>
              </div>
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={() => copyToClipboard(key.value, index)}
              >
                {copiedIndex === index ? 'Copied!' : 'Copy'}
              </Button>
            </div>

            <div className="bg-light p-3 rounded mb-2">
              <code className="d-block text-break">{key.value}</code>
            </div>

            {key.description && (
              <p className="text-muted small mb-0">{key.description}</p>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
            </div>
        </>
    )
}