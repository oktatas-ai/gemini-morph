import * as React from "react";

import { default as Textarea } from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconJarLogoIcon } from "@radix-ui/react-icons";
import { Footer } from "./footer";
import { useEnterSubmit } from "@/hooks/use-enter-submit";

export function ChatPanel({
  handleSubmit,
  handleInputChange,
  input,
}: {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  input: string;
}) {
  const { formRef, onKeyDown } = useEnterSubmit();

  return (
    <div className="fixed inset-x-0 bg-white/90 bottom-0 w-full duration-300 ease-in-out peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px] dark:from-10%">
      <div className="mx-auto sm:max-w-2xl sm:px-4 grid gap-4 sm:pb-4">
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-zinc-100 sm:rounded-[2rem] pl-4 pr-12">
            <Textarea
              tabIndex={0}
              placeholder="Generate an image of ..."
              className="min-h-[60px] w-full bg-transparent placeholder:text-zinc-900 resize-none px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              name="message"
              rows={1}
              value={input}
              onChange={handleInputChange}
              onKeyDown={onKeyDown}
            />
            <div className="absolute right-4 top-[13px] sm:right-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-transparent shadow-none text-zinc-950 rounded-full hover:bg-zinc-200"
                  >
                    <IconJarLogoIcon />
                    <span className="sr-only">Send message</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send message</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </form>
        <Footer className="hidden sm:block" />
      </div>
    </div>
  );
}
