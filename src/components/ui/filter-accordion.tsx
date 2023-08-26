import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.tsx';
import { SlidersHorizontal } from 'lucide-react';
import SearchBar from '@/components/forms/SearchBar.tsx';
import {PageOptions} from "@/redux/api/types/article.types.ts";

const FilterAccordion = ({ onChange }: { onChange: (_option: PageOptions) => void }) => {
  return (
    <Accordion type="single" collapsible className={'border-none max-w-full'}>
      <AccordionItem
        className={'border-none bg-light-2 dark:bg-dark-3 [&>h3]:flex [&>h3]:justify-end self-end'}
        value="item-1">
        <AccordionTrigger
          className={'flex justify-center gap-4 !w-[40px] !max-w-[140px] items-end [&>svg:nth-child(3)]:hidden'}>
          <span className={'text-body-medium'}>Фільтр</span>
          <SlidersHorizontal />
        </AccordionTrigger>
        <AccordionContent>
          <SearchBar onChange={onChange} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterAccordion;
