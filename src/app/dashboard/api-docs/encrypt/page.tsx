import {
  SectionCard,
  CodeBlock,
  ErrorCard,
  RateCard,
} from "@/components/api-docs";
import { Header } from "@/components/header";

export default function EncryptApiPage() {
  return (
    <div>
      <Header title="Encrypt API" />

      <div className="space-y-6 px-4 py-6 sm:px-6 md:px-8">
        {/* Endpoint */}
        <SectionCard
          title="Endpoint"
          description="Use this endpoint to securely encrypt text or files using your API key."
        >
          <CodeBlock label="POST /api/v1/encrypt" />
        </SectionCard>

        {/* Request */}
        <SectionCard title="Request:">
          <CodeBlock
            label={`curl -X POST "https://api.mothrbox.com/encrypt" -H "Authorization: Bearer"`}
            isMono
          />
        </SectionCard>

        {/* Response */}
        <SectionCard title="Response:">
          <CodeBlock
            label={`json { "encrypted": "SGVsbG8gV29ybGQ=" }`}
            isMono
          />
        </SectionCard>

        {/* Errors */}
        <SectionCard title="Error:" tag="Usage">
          <div className="grid gap-4 sm:grid-cols-2">
            <ErrorCard
              title="401 Rate Limit Exceeded"
              message="Invalid or missing API key"
            />
            <ErrorCard
              title="Unauthorized"
              message="Invalid or expired token"
            />
          </div>
        </SectionCard>

        {/* Rate Limit */}
        <SectionCard title="Rate Limit:" tag="Usage">
          <div className="grid gap-4 sm:grid-cols-2">
            <RateCard count="10" label="requests/second" />
            <RateCard count="1000" label="requests/day" />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
