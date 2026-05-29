'use client';

import Link from 'next/link';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { cn } from '@/shared/lib/cn';
import { focusRing } from '@/shared/lib/focus-ring';

const HOVER_CLOSE_DELAY_MS = 150;

type DropdownContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openOnHover: boolean;
  triggerId: string;
  menuId: string;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown compound components must be used within Dropdown');
  }
  return context;
}

export interface DropdownProps {
  children: ReactNode;
  className?: string;
  /** Reveal menu on pointer enter; click still opens on touch devices. */
  openOnHover?: boolean;
}

/** Accessible dropdown shell — compose with Trigger, Menu, and Link items. */
export function Dropdown({ children, className, openOnHover = false }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const menuId = `${baseId}-menu`;

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const close = useCallback(() => {
    clearCloseTimer();
    setOpen(false);
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), HOVER_CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const handleMouseEnter = useCallback(() => {
    if (!openOnHover) return;
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer, openOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (!openOnHover) return;
    scheduleClose();
  }, [openOnHover, scheduleClose]);

  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [close, open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, openOnHover, triggerId, menuId }}>
      <div
        ref={containerRef}
        className={cn('relative', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export interface DropdownTriggerProps extends ComponentProps<'button'> {
  children: ReactNode;
}

export function DropdownTrigger({ children, className, ...props }: DropdownTriggerProps) {
  const { open, setOpen, openOnHover, triggerId, menuId } = useDropdown();

  return (
    <button
      type="button"
      id={triggerId}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={menuId}
      data-state={open ? 'open' : 'closed'}
      className={cn('group', className)}
      onClick={() => setOpen(openOnHover ? true : !open)}
      {...props}
    >
      {children}
    </button>
  );
}

export interface DropdownMenuProps {
  children: ReactNode;
  className?: string;
}

export function DropdownMenu({ children, className }: DropdownMenuProps) {
  const { open, menuId, triggerId } = useDropdown();

  if (!open) return null;

  return (
    <ul
      id={menuId}
      role="menu"
      aria-labelledby={triggerId}
      className={cn(
        'absolute left-0 top-[calc(100%+8px)] z-50 min-w-full overflow-hidden rounded-lg border border-border bg-surface-control py-1 shadow-lg',
        className,
      )}
    >
      {children}
    </ul>
  );
}

export interface DropdownLinkProps extends Omit<ComponentProps<typeof Link>, 'role'> {
  children: ReactNode;
  selected?: boolean;
}

export function DropdownLink({ children, className, selected, onClick, ...props }: DropdownLinkProps) {
  const { setOpen } = useDropdown();

  return (
    <li role="none">
      <Link
        role="menuitem"
        className={cn(
          'flex items-center gap-2 px-3 py-2 text-base font-medium tracking-[-0.16px] text-foreground transition hover:bg-surface-muted',
          focusRing,
          selected && 'bg-surface-muted',
          className,
        )}
        onClick={(event) => {
          setOpen(false);
          onClick?.(event);
        }}
        {...props}
      >
        {children}
      </Link>
    </li>
  );
}

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.Link = DropdownLink;
