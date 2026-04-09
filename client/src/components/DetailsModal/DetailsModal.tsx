import { useNavigate } from "react-router-dom";
import Details from "../../pages/ProjectDetails/Details";

const DetailsModal = () => {
  const navigate = useNavigate();

  // Закрыть = вернуться назад (список остаётся в DOM)
  const handleClose = () => navigate(-1);

  return (
    // Оверлей
    <div
      className="fixed inset-0 z-50 bg-black/60 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Контейнер модалки */}
      <div className="relative min-h-screen bg-white mx-auto max-w-full mt-8 rounded-t-2xl">
        {/* Кнопка закрытия */}
        <button
          onClick={handleClose}
          className="absolute top-0 right-4 z-10 p-2 rounded-full bg-white shadow-md"
        >
          ✕
        </button>

        {/* Переиспользуем тот же компонент Details */}
        <Details />
      </div>
    </div>
  );
};

export default DetailsModal;
