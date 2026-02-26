import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { options } from "@/lib/data"

interface DateTimeFilterProps {
  dateQuery: string;
  setDateQuery: (query: string) => void;
}

const DateTimeFilter = ({dateQuery, setDateQuery}: DateTimeFilterProps) => {

  return (
    <Combobox items={options}>
      <ComboboxInput size={20} className={'bg-card'} placeholder="Hôm nay" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem onClick={()=>setDateQuery(item.value)} key={item.value} value={item.label}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export default DateTimeFilter