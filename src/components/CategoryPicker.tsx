"use client";

import {
  Combobox,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
} from "@ui-sdk/react/combobox";
import { useMemo, useState } from "react";
import {
  CATEGORY_OPTIONS,
  countNodes,
  CATEGORY_TREE,
  type CategoryOption,
} from "@/lib/categories";

const TOTAL_NODES = countNodes(CATEGORY_TREE);

export function CategoryPicker() {
  const [value, setValue] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<string[]>([]);

  const leafOnly = useMemo(
    () => CATEGORY_OPTIONS.filter((item) => item.isLeaf),
    [],
  );

  const byId = useMemo(() => {
    const map = new Map<string, CategoryOption>();
    for (const item of leafOnly) map.set(item.id, item);
    return map;
  }, [leafOnly]);

  const items = useMemo(
    () =>
      leafOnly.map((item) => ({
        value: item.id,
        label: item.path,
        keywords: [item.name],
      })),
    [leafOnly],
  );

  const selected = value ? (byId.get(value) ?? null) : null;

  const pushEvent = (message: string) => {
    setEvents((prev) => [message, ...prev].slice(0, 8));
  };

  return (
    <div className="picker-shell">
      <header className="picker-header">
        <p className="eyebrow">@ui-sdk Combobox sandbox</p>
        <h1>3단계 카테고리 선택기</h1>
        <p className="lede">
          가짜 트리 {TOTAL_NODES}개 노드 · leaf {leafOnly.length}개 ·
          typeahead(필터) + selection · 키보드 이동 / 포커스 복구 확인용
        </p>
      </header>

      <Combobox
        items={items}
        value={value}
        query={query}
        open={open}
        autoHighlight="always"
        onValueChange={(next, details) => {
          setValue(next);
          const path = next ? (byId.get(next)?.path ?? next) : "(cleared)";
          pushEvent(`selection: ${path} · reason=${details.reason}`);
        }}
        onQueryChange={(next, details) => {
          setQuery(next);
          pushEvent(`typeahead query: "${next}" · reason=${details.reason}`);
        }}
        onOpenChange={(next, details) => {
          setOpen(next);
          pushEvent(
            `popup ${next ? "open" : "close"} · reason=${details.reason}`,
          );
        }}
      >
        <ComboboxLabel>표준 카테고리</ComboboxLabel>
        <div className="input-row">
          <ComboboxInput
            placeholder="카테고리 검색… (예: 채소, 청소기)"
            className="combobox-input"
          />
          <ComboboxClear className="combobox-clear" aria-label="선택 지우기">
            ×
          </ComboboxClear>
        </div>
        <ComboboxContent className="combobox-content">
          <ComboboxEmpty>일치하는 카테고리가 없습니다.</ComboboxEmpty>
          <ComboboxList className="combobox-list" />
        </ComboboxContent>
      </Combobox>

      <section className="panel">
        <h2>현재 선택</h2>
        {selected ? (
          <dl className="selection-dl">
            <div>
              <dt>path</dt>
              <dd>{selected.path}</dd>
            </div>
            <div>
              <dt>id</dt>
              <dd>{selected.id}</dd>
            </div>
            <div>
              <dt>name</dt>
              <dd>{selected.name}</dd>
            </div>
          </dl>
        ) : (
          <p className="muted">아직 선택된 카테고리가 없습니다.</p>
        )}
      </section>

      <section className="panel">
        <h2>키보드 / 포커스 체크리스트</h2>
        <ol className="checklist">
          <li>입력에 포커스 → 타이핑으로 목록 필터 (typeahead)</li>
          <li>
            <kbd>↓</kbd> / <kbd>↑</kbd> 로 하이라이트 이동 (포커스는 입력에 유지,
            aria-activedescendant)
          </li>
          <li>
            <kbd>Enter</kbd> 로 선택 → 팝업 닫힘 → 입력에 포커스 유지
          </li>
          <li>
            <kbd>Escape</kbd> 로 닫기 → 입력에 포커스 복구
          </li>
          <li>
            하이라이트가 있는 상태에서 필터를 좁혀 해당 항목이 사라지면 하이라이트가
            남은 항목으로 복구되는지 확인
          </li>
          <li>
            선택 후 다시 열어 <kbd>Home</kbd> / <kbd>End</kbd> 이동 확인
          </li>
        </ol>
      </section>

      <section className="panel">
        <h2>이벤트 로그</h2>
        {events.length === 0 ? (
          <p className="muted">상호작용하면 여기에 reason이 쌓입니다.</p>
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
