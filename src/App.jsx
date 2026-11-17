import React, { useState, useEffect } from 'react';
import {
  Utensils,
  ShieldCheck,
  Video,
  Clock,
  Ticket,
  Star,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Users,
  QrCode,
  FileText,
  Flame,
  Calendar,
  ChevronRight,
  Camera,
  RefreshCw,
  Info,
  Award,
  ThumbsUp,
  Send,
  Microwave,
  PackageCheck,
  Languages,
} from 'lucide-react';
import {
  INITIAL_SHOPS,
  PICKUP_SLOTS,
  OMAKASE_PREFERENCES,
  MEAL_PLANS,
  INITIAL_REVIEWS,
  SELF_BRING_ZONES,
} from './data/mockData';

export default function App() {
  // Navigation & Presentation Mode
  const [activeTab, setActiveTab] = useState('explore'); // explore | order | kitchen | mealpass | reviews
  const [showItssGuide, setShowItssGuide] = useState(true);
  const [showJpSub, setShowJpSub] = useState(true);

  // Shops & Filters
  const [shops, setShops] = useState(() => {
    const saved = localStorage.getItem('unilunch_shops');
    return saved ? JSON.parse(saved) : INITIAL_SHOPS;
  });
  const [selectedFilter, setSelectedFilter] = useState('all'); // all | gradeA | under30k | lowCrowd
  const [selectedShopId, setSelectedShopId] = useState('shop-1');
  const [inspectModalShop, setInspectModalShop] = useState(null);

  // Ordering & Omakase State
  const [orderMode, setOrderMode] = useState('omakase'); // omakase | menu
  const [selectedMenuId, setSelectedMenuId] = useState('m-101');
  const [selectedPrefs, setSelectedPrefs] = useState(['no-onion', 'high-protein', 'reheat-box']);
  const [customNote, setCustomNote] = useState('Mình có ca học lúc 12h15, nhờ bếp làm cơm nóng giúp mình nhé!');
  const [selectedSlotId, setSelectedSlotId] = useState('slot-2');
  const [paymentMethod, setPaymentMethod] = useState('ticket'); // ticket | wallet
  const [omakasePreview, setOmakasePreview] = useState(null);

  // Student Wallet & Meal Pass State
  const [mealTickets, setMealTickets] = useState(() => {
    const saved = localStorage.getItem('unilunch_tickets');
    return saved !== null ? Number(saved) : 8;
  });
  const [walletBalance, setWalletBalance] = useState(() => {
    const saved = localStorage.getItem('unilunch_wallet');
    return saved !== null ? Number(saved) : 185000;
  });
  const [activePlanName, setActivePlanName] = useState('Gói Vé Ăn Tháng (20 bữa • 25k/suất)');

  // Active Orders & Live Kitchen State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('unilunch_orders');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'ORD-8829',
        shopId: 'shop-1',
        shopName: 'Quầy A1 - Bếp Xanh Canteen (Khu nhà D)',
        type: 'Omakase Online (Bếp tự phối)',
        itemName: 'Suất Omakase Chuẩn Sạch (Ức gà Teriyaki + Cá hồi áp chảo + Canh rong biển)',
        notes: 'Không hành lá • Ưu tiên nhiều đạm • Đựng hộp chia ngăn chịu nhiệt',
        slotTime: '11:15 - 11:30',
        lockerCode: 'Tủ Khóa Khu A - Ô #A08',
        qrCode: 'UNILUNCH-A08-8829',
        priceText: '1 Vé Ăn Định Kỳ (25.000đ)',
        step: 2, // 0: Đã nhận đơn, 1: Đang sơ chế sạch, 2: Bếp đang chế biến (Camera Live), 3: Sẵn sàng tại Làn ưu tiên / Tủ khóa
        createdAt: '10:40 AM',
      },
    ];
  });

  // Self-bring Microwave / Washing Slot State (Challenge 1 support)
  const [bookedSelfSlot, setBookedSelfSlot] = useState('Khu Tự Túc #1 - Sảnh B1 (11:30 - 11:45 • Lò vi sóng #02)');

  // Reviews & Hygiene Alert State
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('unilunch_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });
  const [reviewShopId, setReviewShopId] = useState('shop-1');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewHygiene, setReviewHygiene] = useState(5);
  const [reviewPortion, setReviewPortion] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isHygieneReport, setIsHygieneReport] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Live clock for Kitchen Camera
  const [liveTime, setLiveTime] = useState(new Date().toLocaleTimeString('vi-VN'));

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(new Date().toLocaleTimeString('vi-VN'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('unilunch_shops', JSON.stringify(shops));
  }, [shops]);

  useEffect(() => {
    localStorage.setItem('unilunch_tickets', String(mealTickets));
  }, [mealTickets]);

  useEffect(() => {
    localStorage.setItem('unilunch_wallet', String(walletBalance));
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem('unilunch_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('unilunch_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const selectedShop = shops.find((s) => s.id === selectedShopId) || shops[0];
  const selectedSlot = PICKUP_SLOTS.find((s) => s.id === selectedSlotId) || PICKUP_SLOTS[0];
  const activeOrder = orders[0];

  // Filter shops
  const filteredShops = shops.filter((shop) => {
    if (selectedFilter === 'gradeA') return shop.hygieneGrade === 'A';
    if (selectedFilter === 'under30k') return shop.omakasePrice <= 30000;
    if (selectedFilter === 'lowCrowd') return shop.crowdStatus !== 'high';
    return true;
  });

  // Toggle Omakase preference chip
  const togglePref = (id) => {
    setSelectedPrefs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Generate Omakase Dish Combination Preview
  const handleGenerateOmakasePreview = () => {
    const mainDishes = [
      'Ức gà áp chảo sốt Teriyaki (150g)',
      'Cá hồi phi lê sốt chanh dây (140g)',
      'Thịt bò Mỹ xào bông cải xanh (145g)',
      'Sườn non nướng mật ong rừng (155g)',
    ];
    const sideDishes = [
      'Trứng cuộn Tamagoyaki + Đậu hũ non sốt nấm',
      'Salad bắp cải mè rang + Kim chi cải thảo',
      'Rau củ luộc thập cẩm + Trứng ngâm tương',
    ];
    const soups = ['Canh rong biển thịt băm nóng', 'Canh chua nấm kim châm', 'Canh cải ngọt nấu tôm'];
    const randomMain = mainDishes[Math.floor(Math.random() * mainDishes.length)];
    const randomSide = sideDishes[Math.floor(Math.random() * sideDishes.length)];
    const randomSoup = soups[Math.floor(Math.random() * soups.length)];
    setOmakasePreview({
      main: randomMain,
      side: randomSide,
      soup: randomSoup,
      calories: `${Math.floor(560 + Math.random() * 90)} kcal`,
    });
  };

  // Place Pre-order / Omakase Order
  const handlePlaceOrder = () => {
    const chosenMenu =
      selectedShop.menu.find((m) => m.id === selectedMenuId) || selectedShop.menu[0];
    const cashPrice = orderMode === 'omakase' ? selectedShop.omakasePrice : chosenMenu.price;

    if (paymentMethod === 'ticket') {
      if (mealTickets <= 0) {
        showToast('Bạn đã hết Vé ăn định kỳ! Vui lòng nạp thêm gói Tuần/Tháng hoặc chọn Ví sinh viên.');
        return;
      }
      setMealTickets((prev) => prev - 1);
    } else {
      if (walletBalance < cashPrice) {
        showToast('Số dư Ví sinh viên không đủ!');
        return;
      }
      setWalletBalance((prev) => prev - cashPrice);
    }

    const prefLabels = OMAKASE_PREFERENCES.filter((p) => selectedPrefs.includes(p.id))
      .map((p) => p.label)
      .join(' • ');

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      shopId: selectedShop.id,
      shopName: selectedShop.name,
      type: orderMode === 'omakase' ? 'Omakase Online (Bếp tự phối)' : 'Đặt trước Menu cố định',
      itemName:
        orderMode === 'omakase'
          ? omakasePreview
            ? `Omakase: ${omakasePreview.main} + ${omakasePreview.side}`
            : `Suất Omakase Chuẩn Sạch (${selectedShop.name})`
          : chosenMenu.name,
      notes:
        orderMode === 'omakase'
          ? `${prefLabels || 'Khẩu vị tiêu chuẩn'}${customNote ? ` | Ghi chú: ${customNote}` : ''}`
          : customNote || 'Đúng định lượng tiêu chuẩn, giữ nóng 65°C',
      slotTime: selectedSlot.time,
      lockerCode: `Tủ Khóa Khu A - Ô #A${Math.floor(10 + Math.random() * 80)}`,
      qrCode: `UNILUNCH-${Math.floor(100000 + Math.random() * 900000)}`,
      priceText:
        paymentMethod === 'ticket'
          ? '1 Vé Ăn Định Kỳ (Tiết kiệm ~30%)'
          : `${cashPrice.toLocaleString('vi-VN')}đ`,
      step: 1,
      createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setOrders([newOrder, ...orders]);
    showToast('Đặt suất ăn thành công! Đang chuyển sang màn hình Camera bếp trực tiếp...');
    setActiveTab('kitchen');
  };

  // Buy Meal Plan
  const handleBuyMealPlan = (plan) => {
    setMealTickets((prev) => prev + plan.meals);
    setActivePlanName(plan.name);
    showToast(`Đăng ký thành công ${plan.name}! Đã cộng +${plan.meals} vé ăn vào tài khoản.`);
  };

  // Submit Review or Hygiene Alert
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      showToast('Vui lòng nhập nội dung đánh giá hoặc phản ánh vệ sinh!');
      return;
    }

    const targetShop = shops.find((s) => s.id === reviewShopId) || shops[0];
    const newRev = {
      id: `rev-${Date.now()}`,
      shopId: targetShop.id,
      shopName: targetShop.name,
      studentName: isHygieneReport
        ? 'Ẩn danh (Báo cáo Vệ sinh có xác thực SV)'
        : 'Bạn (Sinh viên K66 - Đã xác thực đơn hàng)',
      verifiedOrder: isHygieneReport
        ? 'Cảnh báo Vệ sinh An toàn Thực phẩm (Kèm ảnh minh chứng)'
        : 'Đã đặt suất ăn qua UniLunch',
      rating: reviewRating,
      hygieneRating: reviewHygiene,
      portionRating: reviewPortion,
      timeAgo: 'Vừa xong',
      comment: reviewText,
      tags: isHygieneReport
        ? ['Cảnh báo vệ sinh', 'Đã gửi Ban quản lý Canteen']
        : ['Đúng định lượng', 'Đáng tiền', 'Sinh viên xác thực'],
      isWarning: isHygieneReport,
      managerReply: isHygieneReport
        ? 'Hệ thống tự động: Đã gắn cờ cảnh báo và gửi thông báo ẩn danh tới Ban Quản Lý Canteen & Chủ quầy để kiểm tra trong 2 giờ tới.'
        : null,
    };

    setReviews([newRev, ...reviews]);

    if (isHygieneReport) {
      setShops((prevShops) =>
        prevShops.map((sh) =>
          sh.id === targetShop.id
            ? { ...sh, warningCount: sh.warningCount + 1 }
            : sh
        )
      );
      showToast('Đã gửi phản ánh vệ sinh ẩn danh! Hệ thống đã cập nhật cảnh báo trên quầy.');
    } else {
      showToast('Cảm ơn bạn đã gửi đánh giá giúp cộng đồng sinh viên chọn quán tốt!');
    }

    setReviewText('');
    setIsHygieneReport(false);
  };

  // Simulate Crowd Update
  const handleRefreshCrowd = () => {
    const statuses = ['low', 'medium', 'high'];
    setShops((prev) =>
      prev.map((sh) => {
        const nextStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const nextCount =
          nextStatus === 'low'
            ? Math.floor(8 + Math.random() * 10)
            : nextStatus === 'medium'
            ? Math.floor(20 + Math.random() * 12)
            : Math.floor(35 + Math.random() * 10);
        return {
          ...sh,
          crowdStatus: nextStatus,
          crowdCount: nextCount,
          walkInWaitMinutes: nextStatus === 'low' ? 3 : nextStatus === 'medium' ? 12 : 24,
        };
      })
    );
    showToast('Đã cập nhật trạng thái đông đúc thời gian thực tại các quầy!');
  };

  const getCrowdBadge = (status, waitMin) => {
    if (status === 'low') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-live" />
          Thông thoáng (Chờ ~{waitMin}p)
        </span>
      );
    }
    if (status === 'medium') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse-live" />
          Vừa phải (Chờ ~{waitMin}p)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse-live" />
        Đang đông cao điểm (Xếp hàng ~{waitMin}p)
      </span>
    );
  };

  const getHygieneBadge = (grade, score) => {
    const colors = {
      A: 'bg-emerald-600 text-white ring-emerald-200',
      B: 'bg-amber-500 text-white ring-amber-200',
      C: 'bg-rose-600 text-white ring-rose-200',
    };
    return (
      <div className="flex items-center gap-2 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl shadow-md border border-slate-200">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-lg ring-4 ${
            colors[grade] || colors.A
          }`}
        >
          {grade}
        </div>
        <div className="text-left">
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 leading-none">
            Điểm Vệ Sinh
          </div>
          <div className="text-xs font-extrabold text-slate-900">
            Hạng {grade} ({score}/100)
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md bg-slate-900 text-white px-4 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Uni<span className="text-emerald-600">Lunch</span>
                </span>
                <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  ITSS 2 • Smart Canteen
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {showJpSub
                  ? '学食・周辺店舗のスマート予約＆衛生可視化システム (Challenge ① & ②)'
                  : 'Đặt bữa trưa chuẩn sạch, Omakase & Làn nhận đồ ưu tiên'}
              </p>
            </div>
          </div>

          {/* Right Controls: ITSS Map toggle, JP subtitle toggle, Wallet & Meal Pass counter */}
          <div className="flex items-center flex-wrap gap-2.5">
            <button
              onClick={() => setShowJpSub(!showJpSub)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition cursor-pointer ${
                showJpSub
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
              title="Bật/Tắt phụ đề Tiếng Nhật cho buổi thuyết trình ITSS"
            >
              <Languages className="w-4 h-4" />
              {showJpSub ? 'VI + 日本語: ON' : 'Chỉ Tiếng Việt'}
            </button>

            <button
              onClick={() => setShowItssGuide(!showItssGuide)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Info className="w-4 h-4 text-amber-600" />
              {showItssGuide ? 'Ẩn Sơ đồ Challenge ① & ②' : 'Hiện Sơ đồ Challenge ① & ②'}
            </button>

            {/* Meal Pass Tickets Badge */}
            <div
              onClick={() => setActiveTab('mealpass')}
              className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-xl cursor-pointer transition"
            >
              <Ticket className="w-4 h-4 text-emerald-600" />
              <div className="text-xs">
                <span className="text-slate-500">Vé ăn định kỳ: </span>
                <span className="font-extrabold text-emerald-700">{mealTickets} suất</span>
              </div>
            </div>

            {/* Student Wallet */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
              <span className="text-slate-500">Ví SV:</span>
              <span className="font-bold text-slate-800">
                {walletBalance.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-slate-100 bg-slate-50/60">
          <nav className="flex items-center gap-1 overflow-x-auto py-1.5">
            {[
              {
                id: 'explore',
                label: '1. Quầy Ăn & Điểm Vệ Sinh A/B/C',
                jp: '店舗状態・衛生ランク・食材記録',
                icon: ShieldCheck,
              },
              {
                id: 'order',
                label: '2. Đặt Trước & Chế Độ Omakase',
                jp: '事前予約・おまかせ注文・時間帯選択',
                icon: Sparkles,
              },
              {
                id: 'kitchen',
                label: '3. Camera Bếp & QR Làn Ưu Tiên',
                jp: '厨房ライブカメラ・優先受取QR・自炊温め予約',
                icon: Video,
                badge: orders.length,
              },
              {
                id: 'mealpass',
                label: '4. Gói Vé Ăn Tuần / Tháng',
                jp: '定額ミールパス（週・月）',
                icon: Ticket,
              },
              {
                id: 'reviews',
                label: '5. Đánh Giá & Phản Ánh Vệ Sinh',
                jp: '学生レビュー・衛生通報システム',
                icon: Star,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <div className="text-left">
                    <div>{tab.label}</div>
                    {showJpSub && (
                      <div
                        className={`text-[10px] font-normal ${
                          isActive ? 'text-emerald-100' : 'text-slate-400'
                        }`}
                      >
                        {tab.jp}
                      </div>
                    )}
                  </div>
                  {tab.badge ? (
                    <span
                      className={`ml-1 px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
                        isActive ? 'bg-white text-emerald-700' : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Interactive ITSS Challenge 1 & 2 Feature Matrix Banner */}
        {showItssGuide && (
          <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-5 shadow-lg border border-slate-700">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-700/80">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-1.5 border border-emerald-500/30">
                  🎯 Bảng đối chiếu trực tiếp từ Sheet Thiết Kế (4. 解決策と機能)
                </div>
                <h1 className="text-lg sm:text-xl font-extrabold">
                  Giải quyết nỗi đau: Mất 35k–50k nhưng đồ ăn ít, mất vệ sinh & xếp hàng mệt mỏi giờ cao điểm
                </h1>
              </div>
              <div className="text-xs text-slate-300 bg-white/5 px-3.5 py-2.5 rounded-xl border border-white/10 shrink-0">
                💡 <span className="font-semibold text-white">Mẹo thuyết trình:</span> Bấm vào bất kỳ ô tính năng nào bên dưới để nhảy trực tiếp tới màn hình demo!
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {/* Challenge 1 Box */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-500 text-slate-950">
                    課題 (Challenge) ①
                  </span>
                  <span className="text-xs text-emerald-300 font-medium">
                    Đặt bữa trưa chuẩn sạch, Omakase & Theo dõi trực tiếp
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                  <button
                    onClick={() => {
                      setOrderMode('omakase');
                      setActiveTab('order');
                    }}
                    className="text-left p-2.5 rounded-lg bg-white/10 hover:bg-emerald-600/40 border border-white/10 transition cursor-pointer"
                  >
                    <div className="text-xs font-bold text-emerald-300">① Đặt trước & Omakase</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Tự chọn món hoặc Bếp tự phối ngẫu nhiên theo ghi chú cá nhân
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('kitchen')}
                    className="text-left p-2.5 rounded-lg bg-white/10 hover:bg-emerald-600/40 border border-white/10 transition cursor-pointer"
                  >
                    <div className="text-xs font-bold text-emerald-300">② Camera ở bếp & Khu tự túc</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Xem trực tiếp bếp nấu & Đặt giờ lò vi sóng/rửa hộp 1 ngăn
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className="text-left p-2.5 rounded-lg bg-white/10 hover:bg-emerald-600/40 border border-white/10 transition cursor-pointer"
                  >
                    <div className="text-xs font-bold text-emerald-300">③ Hệ thống đánh giá quán</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Đánh giá từ SV khóa trước & Báo cáo vệ sinh ẩn danh
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('explore')}
                    className="text-left p-2.5 rounded-lg bg-white/10 hover:bg-emerald-600/40 border border-white/10 transition cursor-pointer"
                  >
                    <div className="text-xs font-bold text-emerald-300">④ Theo dõi trạng thái quán</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Biết ngay mức độ đông đúc & thời gian chờ từng quầy
                    </div>
                  </button>
                </div>
              </div>

              {/* Challenge 2 Box */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-400 text-slate-950">
                    課題 (Challenge) ②
                  </span>
                  <span className="text-xs text-amber-300 font-medium">
                    Đặt trước né cao điểm, Vé định kỳ & Minh bạch nguyên liệu
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                  <button
                    onClick={() => setActiveTab('order')}
                    className="text-left p-2.5 rounded-lg bg-white/10 hover:bg-amber-500/30 border border-white/10 transition cursor-pointer"
                  >
                    <div className="text-xs font-bold text-amber-300">① Chốt menu & Chọn giờ nhận</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Đặt từ sớm, lấy đồ tại Làn ưu tiên / Tủ khóa né giờ cao điểm
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('mealpass')}
                    className="text-left p-2.5 rounded-lg bg-white/10 hover:bg-amber-500/30 border border-white/10 transition cursor-pointer"
                  >
                    <div className="text-xs font-bold text-amber-300">② Gói vé ăn định kỳ</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Mua theo Tuần/Tháng chỉ 25k–28k/suất (Rẻ hơn 30% so với 35k–50k)
                    </div>
                  </button>
                  <button
                    onClick={() => setInspectModalShop(shops[0])}
                    className="text-left p-2.5 rounded-lg bg-white/10 hover:bg-amber-500/30 border border-white/10 transition cursor-pointer"
                  >
                    <div className="text-xs font-bold text-amber-300">③ Nhật ký nguyên liệu</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Công khai nguồn gốc thịt, rau, gạo nhập lúc 5h30 sáng
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('explore')}
                    className="text-left p-2.5 rounded-lg bg-white/10 hover:bg-amber-500/30 border border-white/10 transition cursor-pointer"
                  >
                    <div className="text-xs font-bold text-amber-300">④ Điểm vệ sinh A/B/C</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Xếp hạng an toàn thực phẩm & Ảnh kiểm tra bếp hàng tuần
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            TAB 1: KHÁM PHÁ QUẦY ĂN, TRẠNG THÁI QUÁN & ĐIỂM VỆ SINH A/B/C
        ===================================================================== */}
        {activeTab === 'explore' && (
          <div className="space-y-6">
            {/* Filter & Live Crowd Refresh Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
                  Bộ lọc nhu cầu SV:
                </span>
                {[
                  { id: 'all', label: 'Tất cả quầy đã kiểm định (3)' },
                  { id: 'gradeA', label: '🛡️ Chuẩn Vệ Sinh Hạng A' },
                  { id: 'under30k', label: '💰 Suất Omakase ≤ 30.000đ' },
                  { id: 'lowCrowd', label: '⚡ Thông thoáng • Lấy dưới 30 phút' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFilter(f.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      selectedFilter === f.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleRefreshCrowd}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1.5 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Cập nhật trạng thái đông đúc (Live)
              </button>
            </div>

            {/* Shop Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filteredShops.map((shop) => (
                <div
                  key={shop.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition overflow-hidden flex flex-col"
                >
                  {/* Top Image + Hygiene Grade A/B/C + Crowd Status */}
                  <div className="relative h-48 bg-slate-200">
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* Top Left: Hygiene Grade A/B/C */}
                    <div className="absolute top-3 left-3">
                      {getHygieneBadge(shop.hygieneGrade, shop.hygieneScore)}
                    </div>

                    {/* Top Right: Live Camera Button */}
                    <button
                      onClick={() => {
                        setSelectedShopId(shop.id);
                        setActiveTab('kitchen');
                      }}
                      className="absolute top-3 right-3 bg-slate-900/85 hover:bg-slate-900 text-white px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 backdrop-blur border border-white/15 cursor-pointer"
                    >
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse-live" />
                      <Video className="w-3.5 h-3.5 text-emerald-400" />
                      Xem Camera Bếp
                    </button>

                    {/* Bottom overlay: Crowd Status */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                      {getCrowdBadge(shop.crowdStatus, shop.walkInWaitMinutes)}
                      <span className="text-xs font-bold text-white bg-emerald-600/90 px-2.5 py-1 rounded-full">
                        Làn Ưu Tiên: {shop.priorityWaitMinutes} phút
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                            {shop.category}
                          </span>
                          <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                            {shop.name}
                          </h3>
                          {showJpSub && (
                            <p className="text-xs text-slate-400">{shop.nameJp}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-extrabold text-slate-800">
                            {shop.rating}
                          </span>
                          <span className="text-[10px] text-slate-500">({shop.reviewCount})</span>
                        </div>
                      </div>

                      {/* Warning Banner if reported */}
                      {shop.warningCount > 0 && (
                        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-2 text-xs text-amber-900">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">Có {shop.warningCount} phản ánh vệ sinh gần đây:</span>{' '}
                            Ban quản lý đang giám sát khắc phục sàn bếp giờ cao điểm.
                          </div>
                        </div>
                      )}

                      {/* Crowd Meter Bar */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="font-semibold text-slate-600 flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            Lượng khách tại quầy hiện tại:
                          </span>
                          <span className="font-bold text-slate-900">
                            {shop.crowdCount}/{shop.maxCapacity} người
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              shop.crowdStatus === 'low'
                                ? 'bg-emerald-500'
                                : shop.crowdStatus === 'medium'
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                            style={{
                              width: `${Math.min(
                                100,
                                Math.round((shop.crowdCount / shop.maxCapacity) * 100)
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Daily Ingredient Preview */}
                      <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/70 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-emerald-600" />
                            Nhật ký nguyên liệu hôm nay ({shop.ingredientLogs.length} lô):
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-700">
                            Kiểm định: {shop.lastInspected}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2">
                          ✅ {shop.ingredientLogs.map((i) => `${i.item} (${i.origin})`).join(' • ')}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-500">Giá suất ăn cam kết định lượng:</span>
                        <span className="font-extrabold text-emerald-700 text-sm">
                          {shop.priceRange}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setInspectModalShop(shop)}
                          className="px-3 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          Nhật Ký & Bếp
                        </button>
                        <button
                          onClick={() => {
                            setSelectedShopId(shop.id);
                            setSelectedMenuId(shop.menu[0]?.id || 'm-101');
                            setActiveTab('order');
                          }}
                          className="px-3 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4" />
                          Đặt Món / Omakase
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 2: ĐẶT TRƯỚC SUẤT ĂN, OMAKASE ONLINE & CHỌN GIỜ NHẬN ĐỒ
        ===================================================================== */}
        {activeTab === 'order' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Columns: Step-by-step Pre-order & Omakase Configuration */}
            <div className="lg:col-span-8 space-y-6">
              {/* Step 1: Select Verified Canteen Stall */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">
                      1
                    </span>
                    Chọn Quầy Canteen Đạt Chuẩn Vệ Sinh
                  </h2>
                  <button
                    onClick={() => setInspectModalShop(selectedShop)}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Xem Nhật ký nguyên liệu của quầy này
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {shops.map((sh) => {
                    const active = sh.id === selectedShopId;
                    return (
                      <div
                        key={sh.id}
                        onClick={() => {
                          setSelectedShopId(sh.id);
                          setSelectedMenuId(sh.menu[0]?.id);
                        }}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition ${
                          active
                            ? 'border-emerald-600 bg-emerald-50/50'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-emerald-600 text-white">
                            Hạng Vệ Sinh {sh.hygieneGrade}
                          </span>
                          <span className="text-xs font-bold text-emerald-700">
                            Omakase {sh.omakasePrice / 1000}k
                          </span>
                        </div>
                        <div className="font-bold text-xs text-slate-900 line-clamp-1">
                          {sh.name}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          Làn ưu tiên: {sh.priorityWaitMinutes}p • Khách thường: {sh.walkInWaitMinutes}p
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Choose Mode (Omakase Online vs Self-Select Menu) */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">
                      2
                    </span>
                    Chọn Hình Thức Suất Ăn (Tự Chọn Món hoặc Omakase Online)
                  </h2>

                  <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200">
                    <button
                      onClick={() => setOrderMode('omakase')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        orderMode === 'omakase'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Chế độ Omakase (Bếp tự phối)
                    </button>
                    <button
                      onClick={() => setOrderMode('menu')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        orderMode === 'menu'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      Tự chọn món theo Menu ngày
                    </button>
                  </div>
                </div>

                {orderMode === 'omakase' ? (
                  <div className="space-y-4 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 p-4 rounded-2xl border border-emerald-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-200/70">
                      <div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-600 text-white mb-1">
                          ✨ Tính năng nổi bật Challenge ①
                        </span>
                        <h3 className="font-extrabold text-slate-900 text-base">
                          Omakase Online – Nhà bếp tự phối suất ăn nóng sốt theo ghi chú cá nhân
                        </h3>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Không cần đau đầu nghĩ hôm nay ăn gì! Đầu bếp phối ngẫu nhiên 1 món đạm chính (≥150g) + 2 món phụ + 1 canh từ nguyên liệu tươi nhất sáng nay.
                        </p>
                      </div>
                      <div className="text-right shrink-0 bg-white px-3.5 py-2 rounded-xl border border-emerald-200 shadow-2xs">
                        <div className="text-[11px] text-slate-500">Giá Omakase niêm yết</div>
                        <div className="text-lg font-extrabold text-emerald-700">
                          {selectedShop.omakasePrice.toLocaleString('vi-VN')}đ
                        </div>
                        <div className="text-[11px] font-bold text-amber-700">
                          Hoặc chỉ 1 Vé ăn định kỳ (25k)
                        </div>
                      </div>
                    </div>

                    {/* Kitchen Hint */}
                    <div className="p-3 rounded-xl bg-white border border-emerald-200/80 text-xs text-slate-700">
                      <span className="font-bold text-emerald-800">👨‍🍳 Bếp trưởng bật mí hôm nay: </span>
                      {selectedShop.omakaseHint}
                    </div>

                    {/* Personal Notes / Preferences Chips */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-2">
                        Tùy chỉnh sở thích & Dị ứng cá nhân (Bếp sẽ phối món dựa trên lựa chọn này):
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {OMAKASE_PREFERENCES.map((pref) => {
                          const isSelected = selectedPrefs.includes(pref.id);
                          return (
                            <button
                              key={pref.id}
                              type="button"
                              onClick={() => togglePref(pref.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                                isSelected
                                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400'
                              }`}
                            >
                              <span>{pref.icon}</span>
                              <span>{pref.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Preview Omakase Generator */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleGenerateOmakasePreview}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        Xem thử 1 tổ hợp Omakase mẫu của bếp hôm nay
                      </button>

                      {omakasePreview && (
                        <div className="flex-1 bg-white p-3 rounded-xl border border-amber-300 text-xs">
                          <div className="font-bold text-slate-900">
                            🍱 Gợi ý phối mẫu ({omakasePreview.calories}):
                          </div>
                          <div className="text-slate-600 mt-0.5">
                            • <b>Món chính:</b> {omakasePreview.main} | <b>Món phụ:</b>{' '}
                            {omakasePreview.side} | <b>Canh:</b> {omakasePreview.soup}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Self-select Daily Menu Mode */
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {selectedShop.menu.map((item) => {
                      const active = item.id === selectedMenuId;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedMenuId(item.id)}
                          className={`rounded-2xl border-2 overflow-hidden cursor-pointer transition flex flex-col ${
                            active
                              ? 'border-emerald-600 bg-emerald-50/40 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-32 w-full object-cover"
                          />
                          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="text-xs font-extrabold text-emerald-700">
                                  {item.price.toLocaleString('vi-VN')}đ
                                </span>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                                  {item.calories}
                                </span>
                              </div>
                              <h4 className="font-bold text-xs text-slate-900 leading-snug">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-slate-500 mt-1">
                                ⚖️ <b>Định lượng chuẩn:</b> {item.portion}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-1 pt-1">
                              {item.tags.map((t) => (
                                <span
                                  key={t}
                                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Custom Personal Note */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Ghi chú cá nhân gửi trực tiếp tới màn hình Bếp:
                  </label>
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="VD: Không hành, lấy thêm nước sốt, đựng vào hộp giữ nhiệt 1 ngăn..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-emerald-600 bg-white"
                  />
                </div>
              </div>

              {/* Step 3: Select Off-peak Pickup Time Slot & Smart Locker / Priority Lane */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                <div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 mb-1">
                    ⚡ Tính năng nổi bật Challenge ②
                  </span>
                  <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">
                      3
                    </span>
                    Chọn Khung Giờ Nhận Đồ (Làn Ưu Tiên & Tủ Khóa Giữ Nhiệt Né Giờ Cao Điểm)
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {PICKUP_SLOTS.map((slot) => {
                    const active = slot.id === selectedSlotId;
                    return (
                      <div
                        key={slot.id}
                        onClick={() => setSelectedSlotId(slot.id)}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition ${
                          active
                            ? 'border-emerald-600 bg-emerald-50/60'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-sm text-slate-900 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-emerald-600" />
                            {slot.time}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              slot.remaining <= 6
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            Còn {slot.remaining} suất
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-slate-700">{slot.label}</div>
                        <div className="text-[11px] text-emerald-700 font-medium mt-1">
                          🎁 {slot.bonus}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1">📍 {slot.lockerZone}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Order Summary & Checkout */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm sticky top-28 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-extrabold text-base text-slate-900">
                    Tóm Tắt Đơn Đặt Trước
                  </h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    Đảm bảo vệ sinh Hạng {selectedShop.hygieneGrade}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-slate-400 font-semibold uppercase text-[10px]">
                      Quầy thực hiện:
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{selectedShop.name}</div>
                    <div className="text-emerald-700 font-medium">
                      📹 Có Camera trực tiếp quá trình chế biến
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-slate-400 font-semibold uppercase text-[10px]">
                      Suất ăn đã chọn:
                    </div>
                    <div className="font-bold text-slate-900 text-sm">
                      {orderMode === 'omakase'
                        ? '🍱 Suất Omakase Online (Nhà bếp tự phối)'
                        : selectedShop.menu.find((m) => m.id === selectedMenuId)?.name}
                    </div>
                    {orderMode === 'omakase' && (
                      <div className="text-slate-600 mt-1">
                        <b>Khẩu vị:</b>{' '}
                        {OMAKASE_PREFERENCES.filter((p) => selectedPrefs.includes(p.id))
                          .map((p) => p.label)
                          .join(', ') || 'Tiêu chuẩn'}
                      </div>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <div className="text-emerald-700 font-bold uppercase text-[10px]">
                      Khung giờ & Làn nhận đồ ưu tiên:
                    </div>
                    <div className="font-extrabold text-slate-900 text-sm">
                      ⏰ {selectedSlot.time} ({selectedSlot.label})
                    </div>
                    <div className="text-emerald-800">📍 {selectedSlot.lockerZone}</div>
                    <div className="text-[11px] text-slate-600">
                      ✅ Quét mã QR lấy ngay trong 15 giây, không xếp hàng!
                    </div>
                  </div>

                  {/* Payment Selector: Meal Pass Ticket vs Student Wallet */}
                  <div className="space-y-2 pt-2">
                    <div className="font-bold text-slate-800">Phương thức thanh toán:</div>
                    <label
                      onClick={() => setPaymentMethod('ticket')}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition ${
                        paymentMethod === 'ticket'
                          ? 'border-emerald-600 bg-emerald-50/50'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Ticket className="w-5 h-5 text-emerald-600" />
                        <div>
                          <div className="font-bold text-slate-900">
                            Dùng 1 Vé Ăn Định Kỳ (Khuyên dùng)
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Còn {mealTickets} vé trong gói • Tính ra chỉ ~25.000đ/suất
                          </div>
                        </div>
                      </div>
                      <span className="font-extrabold text-emerald-700">1 Vé</span>
                    </label>

                    <label
                      onClick={() => setPaymentMethod('wallet')}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition ${
                        paymentMethod === 'wallet'
                          ? 'border-emerald-600 bg-emerald-50/50'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Award className="w-5 h-5 text-slate-600" />
                        <div>
                          <div className="font-bold text-slate-900">Thanh toán lẻ qua Ví SV</div>
                          <div className="text-[11px] text-slate-500">
                            Số dư: {walletBalance.toLocaleString('vi-VN')}đ
                          </div>
                        </div>
                      </div>
                      <span className="font-extrabold text-slate-900">
                        {(orderMode === 'omakase'
                          ? selectedShop.omakasePrice
                          : selectedShop.menu.find((m) => m.id === selectedMenuId)?.price || 32000
                        ).toLocaleString('vi-VN')}
                        đ
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <PackageCheck className="w-5 h-5" />
                  Xác Nhận Đặt Trước & Theo Dõi Camera Bếp
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 3: CAMERA BẾP TRỰC TIẾP, TRẠNG THÁI CHẾ BIẾN & QR NHẬN ĐỒ
        ===================================================================== */}
        {activeTab === 'kitchen' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 7 Columns: Simulated Live Kitchen Camera Feed */}
              <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl overflow-hidden border border-slate-800 shadow-lg flex flex-col justify-between">
                {/* Camera Top Bar */}
                <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-600 text-white text-xs font-extrabold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse-live" />
                      LIVE KITCHEN CAM
                    </span>
                    <span className="text-xs font-mono text-emerald-400">
                      {selectedShop.cameraCode}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedShopId}
                      onChange={(e) => setSelectedShopId(e.target.value)}
                      className="bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700"
                    >
                      {shops.map((s) => (
                        <option key={s.id} value={s.id}>
                          📹 {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Camera Visual Viewport */}
                <div className="relative h-80 sm:h-96 bg-black overflow-hidden">
                  <img
                    src={selectedShop.kitchenPhoto}
                    alt="Kitchen Camera Feed"
                    className="w-full h-full object-cover opacity-85"
                  />
                  {/* Scanline & HUD Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />

                  {/* Top HUD */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                    <div className="bg-black/70 backdrop-blur px-3 py-1.5 rounded-lg border border-white/15 text-emerald-300">
                      🌡️ Nhiệt độ bếp: {selectedShop.kitchenTemp} | Chuẩn Vệ Sinh: Hạng{' '}
                      {selectedShop.hygieneGrade}
                    </div>
                    <div className="bg-black/70 backdrop-blur px-3 py-1.5 rounded-lg border border-white/15 text-white">
                      🕒 {liveTime}
                    </div>
                  </div>

                  {/* AI Hygiene Detection Bounding Box Simulation */}
                  <div className="absolute top-1/3 left-8 border-2 border-emerald-400/90 bg-emerald-500/10 rounded-xl px-3 py-2 backdrop-blur-xs max-w-xs">
                    <div className="text-[10px] font-mono uppercase font-bold text-emerald-300">
                      ✓ AI Kiểm định vệ sinh trực tiếp
                    </div>
                    <div className="text-xs font-bold text-white">
                      {selectedShop.chefOnDuty} • Đeo khẩu trang & găng tay đạt chuẩn 100%
                    </div>
                  </div>

                  {/* Bottom Live Batch Status */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur p-3.5 rounded-xl border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Flame className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />
                      <div>
                        <div className="text-[11px] text-emerald-400 font-bold uppercase">
                          Trạng thái khu vực nấu hiện tại:
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-white">
                          {selectedShop.currentCookingBatch}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setInspectModalShop(selectedShop)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shrink-0 cursor-pointer"
                    >
                      Xem Nhật Ký Nguyên Liệu
                    </button>
                  </div>
                </div>

                {/* Hygiene Checklist Footer */}
                <div className="p-4 bg-slate-900 grid grid-cols-1 sm:grid-cols-2 gap-2.5 border-t border-slate-800">
                  {selectedShop.hygieneChecklist.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs bg-slate-800/70 px-3 py-2 rounded-lg"
                    >
                      {item.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                      <span className="text-slate-200">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 Columns: Real-Time Order Tracker & Fast-Lane QR Pickup */}
              <div className="lg:col-span-5 space-y-6">
                {activeOrder && (
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[11px] font-extrabold uppercase text-emerald-700">
                          Đơn hàng đang theo dõi #{activeOrder.id}
                        </span>
                        <h3 className="font-extrabold text-base text-slate-900">
                          {activeOrder.itemName}
                        </h3>
                      </div>
                      <button
                        onClick={() => {
                          setOrders((prev) =>
                            prev.map((o, idx) =>
                              idx === 0 ? { ...o, step: (o.step + 1) % 4 } : o
                            )
                          );
                          showToast('Đã cập nhật bước chế biến tiếp theo của nhà bếp!');
                        }}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 cursor-pointer shrink-0"
                        title="Nút dùng để demo chuyển trạng thái đơn hàng khi thuyết trình"
                      >
                        ⏭️ Mô phỏng Bước Tiếp
                      </button>
                    </div>

                    {/* 4-Step Progress Bar */}
                    <div className="space-y-3">
                      {[
                        {
                          step: 0,
                          title: '1. Hệ thống đã chốt suất & gửi ghi chú xuống bếp',
                          desc: `Lúc ${activeOrder.createdAt} • ${activeOrder.notes}`,
                        },
                        {
                          step: 1,
                          title: '2. Kiểm định & Cân định lượng nguyên liệu tươi sạch',
                          desc: 'Đảm bảo đủ định lượng ≥150g đạm, rau rửa sạch khử khuẩn',
                        },
                        {
                          step: 2,
                          title: '3. Đầu bếp đang chế biến (Đang phát trực tiếp trên Camera)',
                          desc: 'Nấu mới theo mẻ, đóng vào hộp giữ nhiệt kháng khuẩn 65°C',
                        },
                        {
                          step: 3,
                          title: '4. Đã đặt sẵn tại Tủ Khóa / Làn Nhận Đồ Ưu Tiên!',
                          desc: `Sẵn sàng nhận trong khung giờ ${activeOrder.slotTime} • Không cần xếp hàng`,
                        },
                      ].map((st) => {
                        const done = activeOrder.step >= st.step;
                        const current = activeOrder.step === st.step;
                        return (
                          <div
                            key={st.step}
                            className={`p-3 rounded-xl border flex items-start gap-3 transition ${
                              current
                                ? 'bg-emerald-50 border-emerald-500 shadow-2xs'
                                : done
                                ? 'bg-slate-50 border-slate-200'
                                : 'bg-white border-slate-100 opacity-50'
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                                done
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {done ? '✓' : st.step + 1}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900">{st.title}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5">{st.desc}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Priority QR Code Locker Box */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500 text-slate-950">
                          Làn Nhận Đồ Ưu Tiên / Tủ Khóa
                        </span>
                        <div className="text-sm font-extrabold">{activeOrder.lockerCode}</div>
                        <div className="text-xs text-emerald-300">
                          Khung giờ hẹn: <b>{activeOrder.slotTime}</b>
                        </div>
                        <div className="text-[11px] text-slate-300 font-mono">
                          Mã xác thực: {activeOrder.qrCode}
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-xl text-slate-900 flex flex-col items-center shrink-0">
                        <QrCode className="w-14 h-14 text-slate-900" />
                        <span className="text-[10px] font-extrabold mt-1">QUÉT MỞ TỦ</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Self-Bring Meal Prep & Microwave Booking (Challenge 1 Solution Integration) */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <Microwave className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">
                        Khu Tự Túc: Đặt Giờ Lò Vi Sóng & Bồn Rửa Hộp 1 Ngăn (Challenge ①)
                      </h4>
                      <p className="text-xs text-slate-500">
                        Dành cho sinh viên tự mang hộp cơm Meal-Prep từ nhà, hâm nóng & rửa dọn nhanh không cần xếp hàng:
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold">
                    ✅ Lịch đặt hiện tại của bạn: {bookedSelfSlot}
                  </div>

                  <div className="space-y-2">
                    {SELF_BRING_ZONES.map((z) => (
                      <div
                        key={z.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2"
                      >
                        <div className="font-bold text-slate-800">{z.name}</div>
                        <div className="text-[11px] text-slate-500">🛠️ {z.equipment}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {z.slots.map((sl) => (
                            <button
                              key={sl}
                              onClick={() => {
                                setBookedSelfSlot(`${z.name} (${sl})`);
                                showToast(`Đã đặt lịch sử dụng lò vi sóng & bồn rửa: ${sl}`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-600 hover:text-white border border-slate-200 text-[11px] font-semibold transition cursor-pointer"
                            >
                              Đặt {sl}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 4: GÓI VÉ ĂN ĐỊNH KỲ TUẦN / THÁNG (MEAL PASS SUBSCRIPTION)
        ===================================================================== */}
        {activeTab === 'mealpass' && (
          <div className="space-y-6">
            {/* Value Proposition Header */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                   Giải pháp trọng tâm Challenge ②
                </span>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Gói Vé Ăn Định Kỳ Tuần / Tháng – Bữa Trưa Chuẩn Sạch Chỉ 25.000đ/Suất
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                  Thay vì tốn 35.000đ – 50.000đ mỗi ngày ở các quán cổng trường không rõ vệ sinh, gói vé định kỳ giúp bạn chủ động ngân sách, chỉ hợp tác với các bếp đạt chuẩn Hạng A và luôn có suất ở Làn ưu tiên.
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-right shrink-0">
                <div className="text-xs text-emerald-800 font-semibold">Số vé hiện có của bạn</div>
                <div className="text-3xl font-extrabold text-emerald-700">{mealTickets} vé</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{activePlanName}</div>
              </div>
            </div>

            {/* Plans Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MEAL_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white rounded-2xl p-6 border-2 border-emerald-600/80 shadow-sm flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                        {plan.badge}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        Giá lẻ: {plan.originalPrice.toLocaleString('vi-VN')}đ
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900">{plan.name}</h3>
                      {showJpSub && <p className="text-xs text-slate-400">{plan.nameJp}</p>}
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-emerald-700">
                        {plan.pricePerMeal.toLocaleString('vi-VN')}đ
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">
                        / bữa trưa ({plan.price.toLocaleString('vi-VN')}đ cho {plan.meals} suất)
                      </span>
                    </div>

                    <ul className="space-y-2 pt-2">
                      {plan.perks.map((perk, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleBuyMealPlan(plan)}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition cursor-pointer"
                  >
                    Đăng Ký Nạp +{plan.meals} Vé Ăn Ngay
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 5: HỆ THỐNG ĐÁNH GIÁ QUÁN & PHẢN ÁNH VỆ SINH MINH BẠCH
        ===================================================================== */}
        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 5 Columns: Submit Student Review or Hygiene Warning Report */}
            <div className="lg:col-span-5">
              <form
                onSubmit={handleSubmitReview}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4 sticky top-28"
              >
                <div>
                  <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Challenge ① & ② • Tiếng nói sinh viên
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">
                    Đánh Giá Quán Ăn hoặc Phản Ánh Vệ Sinh Ẩn Danh
                  </h3>
                  <p className="text-xs text-slate-500">
                    Giúp các khóa sau biết trước quán nào sạch, đáng tiền 30k–35k và tự động gắn nhãn cảnh báo nếu quán mất vệ sinh.
                  </p>
                </div>

                {/* Mode Switch: Normal Review vs Hygiene Report */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setIsHygieneReport(false)}
                    className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                      !isHygieneReport
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'text-slate-600'
                    }`}
                  >
                    ⭐ Đánh giá bữa ăn
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsHygieneReport(true)}
                    className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                      isHygieneReport
                        ? 'bg-rose-600 text-white shadow-2xs'
                        : 'text-slate-600'
                    }`}
                  >
                    🚨 Báo cáo mất vệ sinh
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Chọn Quầy Canteen / Quán ăn quanh trường:
                  </label>
                  <select
                    value={reviewShopId}
                    onChange={(e) => setReviewShopId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                  >
                    {shops.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} (Hạng {s.hygieneGrade})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-[11px] text-slate-500 font-semibold">Tổng thể</div>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="mt-1 font-extrabold text-xs bg-white border border-slate-200 rounded px-2 py-1"
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {n} Sao ⭐
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-[11px] text-slate-500 font-semibold">Độ Vệ Sinh</div>
                    <select
                      value={reviewHygiene}
                      onChange={(e) => setReviewHygiene(Number(e.target.value))}
                      className="mt-1 font-extrabold text-xs bg-white border border-slate-200 rounded px-2 py-1"
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {n}/5 Điểm
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-[11px] text-slate-500 font-semibold">Định Lượng</div>
                    <select
                      value={reviewPortion}
                      onChange={(e) => setReviewPortion(Number(e.target.value))}
                      className="mt-1 font-extrabold text-xs bg-white border border-slate-200 rounded px-2 py-1"
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {n}/5 Đầy đặn
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isHygieneReport
                      ? 'Mô tả chi tiết vấn đề vệ sinh (Hệ thống sẽ ẩn danh tính của bạn):'
                      : 'Trải nghiệm thực tế của bạn (Định lượng đồ ăn, độ sạch, tốc độ nhận đồ):'}
                  </label>
                  <textarea
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder={
                      isHygieneReport
                        ? 'VD: Khay đựng đũa muỗng chưa khô ráo, nhân viên quên đeo găng tay...'
                        : 'VD: Suất Omakase 30k nhiều thịt, rau sạch, quét QR lấy đồ cực nhanh...'
                    }
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl font-extrabold text-xs text-white flex items-center justify-center gap-2 transition cursor-pointer ${
                    isHygieneReport
                      ? 'bg-rose-600 hover:bg-rose-700'
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  {isHygieneReport
                    ? 'Gửi Cảnh Báo Vệ Sinh Ẩn Danh Tới BQL Canteen'
                    : 'Đăng Đánh Giá Xác Thực Sinh Viên'}
                </button>
              </form>
            </div>

            {/* Right 7 Columns: Verified Student Reviews Feed */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Đánh Giá Thực Tế & Nhật Ký Cảnh Báo Vệ Sinh ({reviews.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Chỉ sinh viên có mã đơn hàng thật mới được chấm điểm định lượng & vệ sinh
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  100% Đánh giá xác thực
                </span>
              </div>

              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className={`bg-white rounded-2xl p-5 border shadow-2xs space-y-3 ${
                    rev.isWarning ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900">
                          {rev.studentName}
                        </span>
                        <span className="text-[11px] text-slate-400">• {rev.timeAgo}</span>
                      </div>
                      <div className="text-xs font-semibold text-emerald-700 mt-0.5">
                        📍 {rev.shopName} — <span className="text-slate-500">{rev.verifiedOrder}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-xs font-extrabold text-amber-800">
                        ⭐ {rev.rating}/5
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
                        Vệ sinh: {rev.hygieneRating}/5
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {rev.comment}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {rev.tags.map((t, i) => (
                      <span
                        key={i}
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          rev.isWarning
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  {rev.managerReply && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                      🛡️ <b>Phản hồi minh bạch:</b> {rev.managerReply}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* =====================================================================
          MODAL: NHẬT KÝ NGUYÊN LIỆU TRONG NGÀY & BẢNG ĐIỂM VỆ SINH A/B/C
      ===================================================================== */}
      {inspectModalShop && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-8">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase text-emerald-700">
                  Hồ Sơ Minh Bạch An Toàn Thực Phẩm (Challenge ②)
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {inspectModalShop.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Kiểm tra định kỳ bởi: {inspectModalShop.inspectorTeam} ({inspectModalShop.lastInspected})
                </p>
              </div>
              {getHygieneBadge(inspectModalShop.hygieneGrade, inspectModalShop.hygieneScore)}
            </div>

            {/* Daily Ingredient Origin Table */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                Nhật Ký Nguồn Gốc Nguyên Liệu Tươi Sống Nhập Trong Ngày:
              </h4>
              <div className="space-y-2">
                {inspectModalShop.ingredientLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="font-extrabold text-slate-900">{log.item}</div>
                      <div className="text-slate-600">Nguồn gốc: {log.origin}</div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <div className="font-bold text-emerald-700">✅ {log.status}</div>
                      <div className="text-[11px] text-slate-500">
                        Nhập lúc {log.time} • Khối lượng: {log.quantity} • Bảo quản: {log.tempAtDelivery}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Kitchen Inspection Photo & Criteria */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="rounded-xl overflow-hidden border border-slate-200">
                <img
                  src={inspectModalShop.kitchenPhoto}
                  alt="Ảnh bếp cập nhật hàng tuần"
                  className="w-full h-40 object-cover"
                />
                <div className="p-2 bg-slate-100 text-[11px] font-semibold text-slate-700 text-center">
                  📸 Ảnh thực tế khu bếp cập nhật tuần này
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-800">
                  Tiêu chuẩn chấm điểm vệ sinh công khai:
                </div>
                {inspectModalShop.hygieneChecklist.map((chk, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    {chk.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <span>{chk.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setInspectModalShop(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setSelectedShopId(inspectModalShop.id);
                  setInspectModalShop(null);
                  setActiveTab('order');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              >
                Đặt Suất Ăn Tại Quầy Này
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            <b>UniLunch Smart Canteen</b> — Dự án Web giải quyết bài toán bữa trưa sinh viên (ITSS 2 • Challenge ① & ②)
          </div>
          <div>
            Tích hợp: Đặt trước & Omakase • Camera Bếp • Điểm Vệ Sinh A/B/C • Nhật Ký Nguyên Liệu • Vé Ăn Định Kỳ
          </div>
        </div>
      </footer>
    </div>
  );
}
