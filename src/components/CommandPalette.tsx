"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@ui-sdk/react/command";
import {
  Dialog,
  DialogBackdrop,
  DialogContent,
  DialogShortcut,
  DialogTitle,
  DialogTrigger,
} from "@ui-sdk/react/dialog";
import { useState } from "react";
import {
  COMMAND_LABELS,
  COMMANDS,
  SUGGESTED_COMMANDS,
} from "@/data/commands";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [events, setEvents] = useState<string[]>([]);

  const pushEvent = (message: string) => {
    setEvents((prev) => [message, ...prev].slice(0, 10));
  };

  return (
    <div className="picker-shell">
      <header className="picker-header">
        <p className="eyebrow">@ui-sdk Command + Dialog sandbox</p>
        <h1>커맨드 팔레트</h1>
        <p className="lede">
          Ctrl/Cmd+K 로 열고, 검색(typeahead) 후 Enter로 명령을 실행합니다.
          닫히면 포커스가 트리거 버튼으로 돌아갑니다.
        </p>
      </header>

      <Dialog
        open={open}
        onOpenChange={(next, details) => {
          setOpen(next);
          pushEvent(
            `dialog ${next ? "open" : "close"} · reason=${details.reason}`,
          );
        }}
      >
        <DialogTrigger shortcut="mod+k" className="palette-trigger">
          명령 검색…
          <DialogShortcut className="palette-trigger-hint" />
        </DialogTrigger>
        <DialogBackdrop className="dialog-backdrop" />
        <DialogContent className="dialog-content palette-dialog">
          <DialogTitle className="sr-only">커맨드 팔레트</DialogTitle>
          <Command
            items={COMMANDS}
            emptyItems={SUGGESTED_COMMANDS}
            autoHighlight
            onAction={(value, details) => {
              const label = COMMAND_LABELS[value] ?? value;
              setLastAction(label);
              pushEvent(
                `action: ${label} · event=${details.event?.type ?? "none"}`,
              );
              setOpen(false);
            }}
          >
            <div className="command-input-row">
              <span className="command-search-icon" aria-hidden="true">
                ⌕
              </span>
              <CommandInput
                aria-label="명령 검색"
                placeholder="명령 검색… (예: 카테고리, 상품)"
                className="command-input"
              />
            </div>
            <CommandEmpty>일치하는 명령이 없습니다.</CommandEmpty>
            <CommandList className="command-list" />
          </Command>
        </DialogContent>
      </Dialog>

      <section className="panel">
        <h2>마지막 실행</h2>
        {lastAction ? (
          <p className="action-result">{lastAction}</p>
        ) : (
          <p className="muted">아직 실행한 명령이 없습니다.</p>
        )}
      </section>

      <section className="panel">
        <h2>키보드 / 포커스 체크리스트</h2>
        <ol className="checklist">
          <li>
            <kbd>Ctrl</kbd>+<kbd>K</kbd> (Mac은 <kbd>⌘</kbd>+<kbd>K</kbd>)로
            팔레트 열기
          </li>
          <li>열리면 검색 입력에 포커스</li>
          <li>타이핑으로 명령 필터 (비어 있으면 추천 그룹)</li>
          <li>
            <kbd>↓</kbd> / <kbd>↑</kbd> 하이라이트 이동 (포커스는 입력 유지)
          </li>
          <li>
            <kbd>Enter</kbd> 로 실행 → 다이얼로그 닫힘 → 트리거로 포커스 복구
          </li>
          <li>
            <kbd>Escape</kbd> 로 닫기 → 트리거로 포커스 복구
          </li>
          <li>
            팔레트가 열린 동안 항목 단축키 (<kbd>Ctrl</kbd>+<kbd>N</kbd> 등)도
            동작하는지 확인
          </li>
        </ol>
      </section>

      <section className="panel">
        <h2>이벤트 로그</h2>
        {events.length === 0 ? (
          <p className="muted">열기·검색·실행하면 reason이 쌓입니다.</p>
        ) : (
          <ul className="event-log">
            {events.map((event, index) => (
              <li key={`${index}-${event}`}>{event}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
