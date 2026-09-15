import React from 'react';
import { Bookmark, AppLanguage } from '../types';
import { Bookmark as BookmarkIcon, X, Trash2, Calendar, Clock, ArrowRight } from 'lucide-react';
import { getTranslation } from '../utils/i18n';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  onSelectBookmark: (bookmark: Bookmark) => void;
  onDeleteBookmark: (bookmarkId: string) => void;
  language?: AppLanguage;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onSelectBookmark,
  onDeleteBookmark,
  language = 'en',
}) => {
  const t = getTranslation(language);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-md h-full bg-[#241b22] border-l border-[#3d2b38] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-label={t.bookmarksTitle}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#3d2b38] flex items-center justify-between bg-[#2e222c]">
          <div className="flex items-center gap-2">
            <BookmarkIcon className="w-5 h-5 text-[#ff85a2]" />
            <h3 className="text-base font-bold text-white">{t.bookmarksTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="tap-target p-2.5 rounded-full text-[#c4b5c0] hover:text-white hover:bg-[#3d2b38] transition-colors"
            aria-label={t.closeBookmarks}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ff85a2]/15 flex items-center justify-center text-[#ff85a2]">
                <BookmarkIcon className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">{t.noBookmarksSaved}</h4>
              <p className="text-xs text-[#c4b5c0] max-w-xs leading-relaxed">
                {t.bookmarksEmptyDesc}
              </p>
            </div>
          ) : (
            bookmarks.map((bm) => (
              <div
                key={bm.id}
                onClick={() => {
                  onSelectBookmark(bm);
                  onClose();
                }}
                className="group relative p-4 rounded-2xl bg-[#2e222c] border border-[#3d2b38] hover:border-[#ff85a2]/60 transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <p className="text-xs sm:text-sm text-white leading-relaxed line-clamp-3 mb-3">
                  {bm.text}
                </p>

                <div className="flex items-center justify-between text-[11px] text-[#c4b5c0] pt-2 border-t border-[#3d2b38]/70">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{bm.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{bm.time}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteBookmark(bm.id);
                      }}
                      className="tap-target w-9 h-9 rounded-lg text-[#c4b5c0] hover:text-red-400 hover:bg-red-950/40 transition-colors"
                      title={t.deleteBookmark}
                      aria-label={t.deleteBookmark}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="p-1 text-[#ff85a2]">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
