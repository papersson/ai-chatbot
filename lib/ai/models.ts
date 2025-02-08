import { createAzure } from "@ai-sdk/azure";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";

// Set the default chat model to "o1"
export const DEFAULT_CHAT_MODEL: string = "o3-mini-low";

// Create an Azure instance. Adjust apiVersion and environment variables as needed.
const azure = createAzure({
  resourceName: process.env.NEXT_PUBLIC_AZURE_RESOURCE_NAME || "",
  apiKey: process.env.NEXT_PUBLIC_AZURE_API_KEY || "",
  apiVersion: "2024-12-01-preview",
});

export const myProvider = customProvider({
  languageModels: {
    // Primary models using the actual names
    "o1": azure("o1"),
    "o3-mini-low": azure("o3-mini", {
      providerOptions: { azure: { reasoningEffort: "low" } }
    }),
    "o3-mini-high": azure("o3-mini", {
      providerOptions: { azure: { reasoningEffort: "high" } }
    }),
    "gpt-4o-mini": azure("gpt-4o-mini"),
    "gpt-4o": azure("gpt-4o"),
    // Downstream models that remain unchanged
    "title-model": azure("gpt-4o-mini"),
    "block-model": azure("gpt-4o-mini")
  },
  // imageModels: {
  //   "small-model": azure.image("dall-e-2"),
  //   "large-model": azure.image("dall-e-3"),
  // },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: "o1",
    name: "O1",
    description: "The primary model (o1) for general-purpose tasks.",
  },
  {
    id: "o3-mini-low",
    name: "O3-Mini (Low)",
    description: "A lightweight model with low reasoning effort.",
  },
  {
    id: "o3-mini-high",
    name: "O3-Mini (High)",
    description: "A model with high reasoning effort for more complex tasks.",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o-Mini",
    description: "A lightweight model with low reasoning effort.",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    description: "A model with blablabla.",
  },
  
];
