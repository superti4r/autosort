import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/types';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nama',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'created_at',
    header: 'Dibuat',
    cell: info => new Date(info.getValue() as string).toLocaleDateString(),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="">
            <MoreVertical className="size-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem data-action="edit" data-id={row.original.id}>
            <PencilIcon className="mr-2 size-4" /> Ubah
          </DropdownMenuItem>
          <DropdownMenuItem data-action="delete" data-id={row.original.id} variant="destructive">
            <Trash2Icon className="mr-2 size-4" /> Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
