import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon } from "../UI/icons/SeacrhIcon";
import { useGetProjectsWithFiltersQuery } from "../../store/api/projectSlice";
import { Link, useNavigate } from "react-router-dom";

interface SeacrhModalProps {
  children?: React.ReactNode;
  className?: string;
}

const Example1 = ({ children, className = "" }: SeacrhModalProps) => {
  const naviagte = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { data, isLoading } = useGetProjectsWithFiltersQuery({
    search: query,
  });

  const searchData = data?.projects ?? [];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      closeModal();
      e.preventDefault();

      naviagte(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  // Функции для открытия/закрытия
  function closeModal() {
    setIsOpen(false);
    setQuery("");
  }
  function openModal() {
    setIsOpen(false); // Сначала закрываем (на всякий случай), потом открываем через transition
    setTimeout(() => setIsOpen(true), 10);
  }

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if ((e.ctrlKey || e.metaKey) && e.code === "KeyK") {
  //       e.preventDefault();
  //       setIsOpen(true);
  //     };
  //   };
  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, []);

 

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95, // Начинаем чуть меньше
      y: -20, // И чуть выше
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring", // Пружинная анимация дает "премиальный" вид
        damping: 20,
        stiffness: 300,
        delay: 0.1, // Небольшая задержка после появления бэкдропа
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <div className="flex flex-col  ">
      <button
        onClick={openModal}
        className="
          flex items-center justify-between
          px-6 py-2 
          bg-[#f3f3f6] font-thin rounded-full 
          text-neutral-700 text-sm 
          transition-all duration-200
          hover:bg-white hover:ring-2 hover:ring-stone-100 
          group
        "
      >
        <span>{children}</span>
        <div
          className="w-10 h-10 flex items-center justify-center 
        rounded-full bg-stone-500 group-hover:scale-110 transition-transform ml-5"
        >
          <SearchIcon className="w-6 h-6 text-white" />
        </div>
      </button>

      {/* 2. МОДАЛЬНОЕ ОКНО (Headless UI Dialog) */}

      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            as={motion.div}
            open={isOpen}
            onClose={closeModal}
            className="relative z-50"
          >
            {/* Анимированный Бэкдроп (Затемнение) */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed inset-0 bg-black/20"
              aria-hidden="true"
            />

            {/* Контейнер модалки (для центрирования) */}
            <div className="fixed inset-0 flex items-start justify-center p-4 pt-20 overflow-y-auto">
              {/* Анимированная Панель Модалки */}
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-full max-w-2xl"
              >
                <Dialog.Panel className="w-full bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden border border-neutral-800">
                  {/* Контейнер для реального инпута с ховер-эффектом */}
                  <div className="p-4 border-b border-neutral-800">
                    <div className="relative group">
                      {/* Розовый бордер при ховере/фокусе (реализован через псевдоэлемент для точности) */}
                      <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-stone-100 group-focus-within:border-stone-100 transition-colors pointer-events-none"></div>

                      <div className="flex items-center justify-between w-full px-6 py-3 bg-neutral-200 rounded-full">
                        {/* Реальный <input> внутри */}
                        <input
                          type="text"
                          value={query}
                          onKeyDown={handleEnter}
                          onChange={handleSearch}
                          placeholder="Search for designs, styles, or artists..."
                          className="
                            flex-grow 
                            bg-transparent
                            text-neutral-900 text-lg
                            placeholder-neutral-500
                            focus:outline-none
                          "
                          // Автофокус при открытии (делает Headless UI)
                          autoFocus
                        />
                        {/* Иконка, теперь она в <button> для действия */}
                        <button
                          onClick={() => {
                            closeModal();
                            naviagte(`/search?q=${encodeURIComponent(query)}`);
                          }}
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-500 text-white"
                        >
                          <SearchIcon className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {
                    <div className="p-4 max-h-[60vh] overflow-y-auto">
                      {query.length > 0 ? (
                        <div className="space-y-3">
                          <p className="text-sm text-neutral-500 px-2">
                            Results for "{query}"
                          </p>

                          {isLoading
                            ? "...Loading"
                            : !searchData.length
                              ? "No result"
                              : searchData.map((item) => (
                                  <Link
                                    key={item._id}
                                    to={`/details/${item._id}`} // Путь к конкретному проекту
                                    onClick={closeModal} // ОБЯЗАТЕЛЬНО закрываем модалку
                                    className="block p-3 bg-neutral-800/50 rounded-lg hover:bg-neutral-800 transition-colors group"
                                  >
                                    <div className="flex justify-between items-center">
                                      <span className="text-neutral-200 group-hover:text-white">
                                        {item.title}
                                      </span>
                                      <span className="text-xs text-neutral-500">
                                        View project →
                                      </span>
                                    </div>
                                  </Link>
                                ))}
                        </div>
                      ) : (
                        <div className="text-center py-10 text-neutral-600">
                          Start typing to search...
                        </div>
                      )}
                    </div>
                  }

                  {/* Футер модалки (опционально) */}
                  <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950 text-right">
                    <button
                      onClick={closeModal}
                      className="text-sm text-neutral-500 hover:text-white"
                    >
                      Close (Esc)
                    </button>
                  </div>
                </Dialog.Panel>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Example1;
