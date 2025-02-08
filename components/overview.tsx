import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

export const Overview = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'there';

  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 text-center prose prose-slate dark:prose-invert mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Welcome {userName}</h1>
        <p className="text-muted-foreground">
          Get started by exploring your AI chat history or create a new conversation
        </p>
      </div>
    </motion.div>
  );
};
