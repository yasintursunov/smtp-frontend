'use client';
import { clsx } from 'clsx';
import Icon from './Icon';

export default function Toolbar({ anySelected, onBlock, onUnblock, onDelete, onDeleteUnverified, filter, setFilter } : {
  anySelected: boolean,
  onBlock: ()=>void, onUnblock: ()=>void, onDelete: ()=>void, onDeleteUnverified: ()=>void,
  filter: string, setFilter: (v:string)=>void
}) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <button title="Block" className={clsx('btn btn-primary', !anySelected && 'opacity-50 pointer-events-none')} onClick={onBlock}>
        <Icon name="lock" /> Block
      </button>
      <button title="Unblock" className={clsx('btn btn-ghost', !anySelected && 'opacity-50 pointer-events-none')} onClick={onUnblock}>
        <Icon name="lock-open" />
      </button>
      <button title="Delete" className={clsx('btn btn-ghost', !anySelected && 'opacity-50 pointer-events-none')} onClick={onDelete}>
        <Icon name="trash" />
      </button>
      <div className="ml-auto">
        <input className="input" placeholder="Filter" value={filter} onChange={e=>setFilter(e.target.value)} />
      </div>
    </div>
  );
}
