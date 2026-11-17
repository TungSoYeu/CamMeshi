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
  RefreshCw,
  Award,
  Send,
  Microwave,
  PackageCheck,
  Globe,
} from 'lucide-react';
import {
  INITIAL_SHOPS,
  PICKUP_SLOTS,
  OMAKASE_PREFERENCES,
  MEAL_PLANS,
  INITIAL_REVIEWS,
  SELF_BRING_ZONES,
} from './data/mockData';

const UI_TEXT = {
  vi: {
    tagline: 'Bữa trưa học đường chuẩn sạch • Đặt trước không xếp hàng',
    ticketLabel: 'Vé ăn định kỳ:',
    ticketUnit: 'suất',
    walletLabel: 'Ví sinh viên:',
    tabs: {
      explore: 'Khám Phá Quầy & Vệ Sinh',
      order: 'Đặt Trước & Omakase',
      kitchen: 'Camera Bếp & Nhận Đồ',
      mealpass: 'Gói Vé Ăn Định Kỳ',
      reviews: 'Đánh Giá & Phản Ánh',
    },
    hero: {
      badge: '🌱 Cam kết 100% nguyên liệu tươi sạch kiểm định mỗi sáng',
      title: 'Bữa Trưa Nóng Sốt, Đúng Định Lượng — Chỉ Từ 25.000đ/Suất',
      subtitle:
        'Kiểm tra trực tiếp bảng điểm vệ sinh A/B/C, nhật ký nguyên liệu đầu ngày và Camera bếp. Đặt trước món yêu thích hoặc để đầu bếp phối suất Omakase theo khẩu vị, nhận đồ ngay tại Làn ưu tiên không cần xếp hàng giờ cao điểm.',
      ctaOrder: 'Đặt Suất Trưa Ngay',
      ctaPass: 'Xem Gói Vé Tháng 25k',
      stat1Title: 'Chuẩn Vệ Sinh A/B/C',
      stat1Desc: 'Kiểm định & công khai nguyên liệu lúc 5:30 sáng',
      stat2Title: 'Làn Nhận Đồ Ưu Tiên',
      stat2Desc: 'Quét mã QR lấy cơm trong 15 giây, né giờ cao điểm',
      stat3Title: 'Omakase Theo Khẩu Vị',
      stat3Desc: 'Bếp tự phối món nóng sốt dựa trên ghi chú cá nhân',
    },
    explore: {
      filterTitle: 'Lọc nhanh:',
      filterAll: 'Tất cả quầy đạt chuẩn',
      filterGradeA: '🛡️ Chuẩn Vệ Sinh Hạng A',
      filterUnder30k: '💰 Suất Omakase ≤ 30.000đ',
      filterLowCrowd: '⚡ Thông thoáng • Lấy nhanh',
      refreshCrowd: 'Cập nhật lượng khách trực tiếp',
      hygieneBadgeTitle: 'Điểm Vệ Sinh',
      hygieneGradePrefix: 'Hạng',
      watchCamBtn: 'Camera Bếp',
      priorityLaneBadge: 'Làn ưu tiên:',
      minutesShort: 'phút',
      crowdLow: 'Thông thoáng',
      crowdMed: 'Vừa phải',
      crowdHigh: 'Đang đông',
      waitPrefix: 'Chờ',
      warningBannerPrefix: 'Phản ánh vệ sinh gần đây:',
      warningBannerDesc: 'Ban quản lý đang giám sát khắc phục khu vực sàn bếp giờ cao điểm.',
      currentCrowdLabel: 'Lượng khách tại quầy hiện tại:',
      peopleUnit: 'người',
      ingredientLogTitle: 'Nhật ký nguyên liệu hôm nay',
      batchesUnit: 'lô',
      inspectedAt: 'Kiểm định:',
      priceCommitLabel: 'Mức giá cam kết định lượng:',
      btnInspectLog: 'Nhật Ký & Bếp',
      btnOrderNow: 'Đặt Món / Omakase',
    },
    order: {
      step1Title: 'Chọn Quầy Canteen Đạt Chuẩn Vệ Sinh',
      viewIngredientBtn: 'Xem nhật ký nguyên liệu của quầy này',
      priorityWaitLabel: 'Làn ưu tiên',
      walkInWaitLabel: 'Khách thường',
      step2Title: 'Chọn Hình Thức Suất Ăn',
      modeOmakase: 'Chế độ Omakase (Bếp tự phối)',
      modeMenu: 'Tự chọn món theo Menu ngày',
      omakaseBadge: '✨ Đầu bếp phối món theo khẩu vị riêng',
      omakaseTitle: 'Omakase Online — Suất Ăn Nóng Sốt Phối Theo Ghi Chú Cá Nhân',
      omakaseDesc:
        'Không cần băn khoăn hôm nay ăn gì! Đầu bếp phối ngẫu nhiên 1 món đạm chính (≥150g) + 2 món phụ + 1 canh nóng từ nguyên liệu tươi nhất sáng nay.',
      omakasePriceLabel: 'Giá Omakase niêm yết',
      orOneTicket: 'Hoặc dùng 1 Vé ăn định kỳ (25k)',
      chefHintLabel: '👨‍🍳 Gợi ý từ Bếp trưởng hôm nay: ',
      prefTitle: 'Tùy chỉnh sở thích & Dị ứng cá nhân (Bếp sẽ chế biến đúng theo lựa chọn):',
      previewOmakaseBtn: 'Xem thử gợi ý phối món Omakase hôm nay',
      previewResultTitle: '🍱 Tổ hợp Omakase gợi ý',
      mainDishLabel: 'Món chính',
      sideDishLabel: 'Món phụ',
      soupLabel: 'Canh',
      portionCommit: 'Định lượng chuẩn:',
      customNoteLabel: 'Ghi chú riêng gửi trực tiếp tới màn hình nhà bếp:',
      customNotePlaceholder: 'VD: Không hành, lấy thêm nước sốt, đựng vào hộp giữ nhiệt 1 ngăn...',
      step3Badge: '⚡ Nhận đồ không cần xếp hàng',
      step3Title: 'Chọn Khung Giờ Nhận Đồ (Làn Ưu Tiên & Tủ Khóa Giữ Nhiệt QR)',
      slotsRemainingPrefix: 'Còn',
      slotsRemainingSuffix: 'suất',
      summaryTitle: 'Tóm Tắt Đơn Đặt Trước',
      summaryHygienePrefix: 'Chuẩn vệ sinh Hạng',
      summaryStallLabel: 'Quầy thực hiện:',
      summaryCamNote: '📹 Hỗ trợ xem trực tiếp Camera quá trình chế biến',
      summaryMealLabel: 'Suất ăn đã chọn:',
      summaryOmakaseName: '🍱 Suất Omakase Online (Nhà bếp tự phối)',
      summaryPrefLabel: 'Khẩu vị:',
      summaryStandardPref: 'Tiêu chuẩn',
      summarySlotLabel: 'Khung giờ & Vị trí nhận đồ ưu tiên:',
      summaryQrHint: '✅ Quét mã QR nhận ngay trong 15 giây, không phải xếp hàng chờ!',
      paymentTitle: 'Phương thức thanh toán:',
      payByTicketTitle: 'Dùng 1 Vé Ăn Định Kỳ (Khuyên dùng)',
      payByTicketDescPrefix: 'Còn',
      payByTicketDescSuffix: 'vé trong tài khoản • Tiết kiệm tới 30%',
      oneTicketBadge: '1 Vé',
      payByWalletTitle: 'Thanh toán trực tiếp bằng Ví Sinh Viên',
      walletBalancePrefix: 'Số dư hiện tại:',
      confirmOrderBtn: 'Xác Nhận Đặt Trước & Theo Dõi Bếp',
    },
    kitchen: {
      liveCamBadge: 'CAMERA BẾP TRỰC TIẾP',
      tempLabel: 'Nhiệt độ bếp:',
      aiCheckTitle: '✓ Giám sát an toàn vệ sinh thời gian thực',
      aiCheckDesc: 'Đầy đủ khẩu trang, găng tay & trang phục bếp tiêu chuẩn',
      currentBatchLabel: 'Hoạt động chế biến hiện tại:',
      viewLogBtn: 'Xem Nhật Ký Nguyên Liệu',
      trackingOrderPrefix: 'Đơn hàng đang thực hiện',
      simulateNextBtn: '⏭️ Chuyển bước chế biến',
      steps: [
        {
          title: '1. Đã tiếp nhận đơn & đồng bộ ghi chú cá nhân xuống bếp',
        },
        {
          title: '2. Kiểm định & cân định lượng nguyên liệu tươi sạch',
          desc: 'Đảm bảo đủ định lượng ≥150g đạm, rau củ rửa sục ozone khử khuẩn',
        },
        {
          title: '3. Đầu bếp đang chế biến nóng (Trực tiếp trên Camera)',
          desc: 'Nấu mới theo mẻ, đóng vào hộp giữ nhiệt kháng khuẩn ở 65°C',
        },
        {
          title: '4. Đã đặt sẵn tại Tủ Khóa / Làn Nhận Đồ Ưu Tiên!',
          descPrefix: 'Sẵn sàng nhận trong khung giờ',
          descSuffix: '• Không cần xếp hàng',
        },
      ],
      lockerBadge: 'Làn Nhận Đồ Ưu Tiên / Tủ Khóa Giữ Nhiệt',
      pickupTimeLabel: 'Khung giờ hẹn:',
      authCodeLabel: 'Mã nhận đồ:',
      scanQrText: 'QUÉT MỞ TỦ',
      selfZoneTitle: 'Khu Tự Túc: Đặt Giờ Lò Vi Sóng & Bồn Rửa Hộp Cơm 1 Ngăn',
      selfZoneSubtitle:
        'Dành cho sinh viên tự mang hộp cơm chuẩn bị sẵn từ nhà, chủ động hâm nóng và rửa dọn sạch sẽ mà không phải chờ đợi:',
      currentSelfSlotPrefix: 'Lịch đặt hiện tại của bạn:',
      bookSlotPrefix: 'Đặt khung',
    },
    mealpass: {
      badge: '💳 Giải pháp tiết kiệm & chủ động bữa trưa',
      title: 'Gói Vé Ăn Định Kỳ Tuần / Tháng — Ăn Trưa Chuẩn Sạch Chỉ 25.000đ/Suất',
      subtitle:
        'Thay vì tốn 35.000đ – 50.000đ mỗi ngày tại các hàng quán không rõ chất lượng vệ sinh, gói vé định kỳ giúp bạn cố định chi phí hợp lý, chỉ áp dụng tại các bếp đạt chuẩn an toàn và luôn được ưu tiên nhận đồ không cần xếp hàng.',
      currentTicketsLabel: 'Số vé ăn hiện có',
      ticketsUnit: 'vé',
      retailPricePrefix: 'Giá mua lẻ:',
      perMealSuffix: '/ bữa trưa',
      forMealsPrefix: 'cho',
      mealsUnit: 'suất',
      buyPlanBtnPrefix: 'Đăng Ký Gói (+',
      buyPlanBtnSuffix: ' Vé Ăn Ngay)',
    },
    reviews: {
      badge: '💬 Cộng đồng sinh viên kiểm chứng',
      formTitle: 'Đánh Giá Bữa Ăn hoặc Gửi Phản Ánh Vệ Sinh Ẩn Danh',
      formSubtitle:
        'Giúp sinh viên dễ dàng biết trước quán nào ngon, sạch, đúng định lượng và tự động cảnh báo khi có vấn đề vệ sinh.',
      modeReview: '⭐ Đánh giá quán ăn',
      modeReport: '🚨 Phản ánh vệ sinh',
      selectStallLabel: 'Chọn Quầy Canteen / Quán ăn:',
      scoreOverall: 'Tổng thể',
      scoreHygiene: 'Độ Vệ Sinh',
      scorePortion: 'Định Lượng',
      starsUnit: 'Sao ⭐',
      pointsUnit: '/5 Điểm',
      fullPortionUnit: '/5 Đầy đặn',
      commentLabelNormal: 'Chia sẻ trải nghiệm thực tế của bạn (Định lượng, hương vị, tốc độ lấy đồ):',
      commentLabelReport: 'Mô tả vấn đề vệ sinh cần khắc phục (Danh tính của bạn được bảo mật hoàn toàn):',
      commentPlaceholderNormal: 'VD: Suất Omakase 30k đầy đặn, thịt tươi, quét mã QR lấy đồ rất nhanh...',
      commentPlaceholderReport: 'VD: Khu vực khay đựng muỗng đũa cần lau khô hơn vào giờ cao điểm...',
      submitReviewBtn: 'Đăng Đánh Giá Xác Thực',
      submitReportBtn: 'Gửi Cảnh Báo Vệ Sinh Ẩn Danh',
      feedTitle: 'Đánh Giá Thực Tế & Nhật Ký Giám Sát Vệ Sinh',
      feedSubtitle: 'Chỉ sinh viên đã sử dụng dịch vụ mới có thể chấm điểm định lượng & vệ sinh',
      verifiedBadge: '100% Sinh viên xác thực',
      hygieneScorePrefix: 'Vệ sinh:',
      managerReplyPrefix: 'Phản hồi từ Ban Quản Lý:',
    },
    modal: {
      badge: 'Hồ Sơ Minh Bạch An Toàn Thực Phẩm',
      inspectedByPrefix: 'Kiểm định bởi:',
      ingredientTableTitle: 'Nhật Ký Nguồn Gốc Nguyên Liệu Tươi Sống Nhập Trong Ngày:',
      originPrefix: 'Nguồn gốc:',
      importedAtPrefix: 'Nhập lúc',
      quantityPrefix: 'Khối lượng:',
      storageTempPrefix: 'Bảo quản:',
      weeklyPhotoCaption: '📸 Hình ảnh thực tế khu vực bếp kiểm tra định kỳ',
      criteriaTitle: 'Các tiêu chuẩn an toàn vệ sinh được kiểm chứng:',
      closeBtn: 'Đóng cửa sổ',
      orderThisStallBtn: 'Đặt Suất Ăn Tại Quầy Này',
    },
    footer: {
      left: 'UniBite — Hệ thống Đặt Bữa Trưa Học Đường Thông Minh & Minh Bạch Vệ Sinh',
      right: 'Đặt trước & Omakase • Camera Bếp • Điểm Vệ Sinh A/B/C • Nhật Ký Nguyên Liệu • Vé Ăn Định Kỳ',
    },
    toasts: {
      noTickets: 'Bạn đã hết Vé ăn định kỳ! Vui lòng đăng ký thêm gói Tuần/Tháng hoặc chọn Ví sinh viên.',
      lowWallet: 'Số dư Ví sinh viên không đủ!',
      orderSuccess: 'Đặt suất ăn thành công! Bạn có thể theo dõi trực tiếp qua Camera bếp.',
      planSuccessPrefix: 'Đăng ký thành công! Đã cộng thêm +',
      planSuccessSuffix: ' vé ăn vào tài khoản của bạn.',
      emptyReview: 'Vui lòng nhập nội dung đánh giá hoặc phản ánh!',
      reportSubmitted: 'Đã gửi phản ánh vệ sinh ẩn danh! Hệ thống đã cập nhật thông báo tới Ban quản lý.',
      reviewSubmitted: 'Cảm ơn bạn đã gửi đánh giá giúp cộng đồng sinh viên chọn được quán ăn chất lượng!',
      crowdUpdated: 'Đã cập nhật tình trạng khách thực tế tại các quầy ăn!',
      stepUpdated: 'Đã cập nhật tiến độ chế biến của nhà bếp!',
      selfSlotBookedPrefix: 'Đã đặt lịch sử dụng khu tự túc: ',
    },
  },
  jp: {
    tagline: '安心・清潔なキャンパスランチ • 事前予約で行列ゼロ',
    ticketLabel: '定期食券残高:',
    ticketUnit: '食分',
    walletLabel: '学生ウォレット:',
    tabs: {
      explore: '店舗一覧・衛生ランク',
      order: '事前予約・おまかせ注文',
      kitchen: '厨房カメラ・QR受取',
      mealpass: '定額ミールパス',
      reviews: '学生レビュー・衛生報告',
    },
    hero: {
      badge: '🌱 毎朝5:30に検品された安全・新鮮な食材を100%使用',
      title: '出来立て・分量保証の清潔なランチを1食 25,000đ から',
      subtitle:
        'A/B/C衛生ランク、当日の食材産地トレーサビリティ、厨房ライブカメラをいつでも確認可能。メニュー選択やシェフのおまかせ予約で、ピーク時でも優先レーン・保温ロッカーから15秒で受け取れます。',
      ctaOrder: '今すぐランチを予約',
      ctaPass: 'お得な定額パスを見る',
      stat1Title: 'A/B/C 衛生ランク公開',
      stat1Desc: '毎朝5:30の食材検品ログと週次厨房写真を公開',
      stat2Title: '優先レーン＆スマートロッカー',
      stat2Desc: 'QRコードをかざして15秒で受取・行列待ちゼロ',
      stat3Title: 'お好み対応おまかせ弁当',
      stat3Desc: '苦手食材や栄養バランスに合わせてシェフが調理',
    },
    explore: {
      filterTitle: '絞り込み:',
      filterAll: 'すべての認定店舗',
      filterGradeA: '🛡️ 衛生Aランク店舗のみ',
      filterUnder30k: '💰 おまかせ 30,000đ 以下',
      filterLowCrowd: '⚡ 空いている店舗',
      refreshCrowd: '混雑状況をリアルタイム更新',
      hygieneBadgeTitle: '衛生評価',
      hygieneGradePrefix: 'ランク',
      watchCamBtn: '厨房カメラ',
      priorityLaneBadge: '優先受取:',
      minutesShort: '分',
      crowdLow: '空いています',
      crowdMed: 'やや混雑',
      crowdHigh: '混雑中',
      waitPrefix: '通常待ち',
      warningBannerPrefix: '最近の衛生フィードバック:',
      warningBannerDesc: '管理委員会の指導のもと、ピーク時の床面乾燥対策を実施中です。',
      currentCrowdLabel: '現在のカウンター利用状況:',
      peopleUnit: '名',
      ingredientLogTitle: '本日の食材トレーサビリティ記録',
      batchesUnit: '件',
      inspectedAt: '検品時刻:',
      priceCommitLabel: '分量保証価格帯:',
      btnInspectLog: '食材記録・衛生詳細',
      btnOrderNow: '予約・おまかせ注文',
    },
    order: {
      step1Title: '衛生基準クリア済みの店舗を選択',
      viewIngredientBtn: 'この店舗の当日食材ログを見る',
      priorityWaitLabel: '優先受取',
      walkInWaitLabel: '通常並び',
      step2Title: '注文スタイルを選択',
      modeOmakase: 'おまかせモード（シェフ厳選）',
      modeMenu: '日替わりメニューから選択',
      omakaseBadge: '✨ 個人メモに合わせてシェフが組み合わせ',
      omakaseTitle: 'オンラインおまかせ — お好みに合わせた出来立てバランス弁当',
      omakaseDesc:
        '毎日のメニュー選びに迷う必要なし！当日の新鮮食材から主菜1品（お肉・魚150g以上）＋副菜2品＋温かいスープをシェフがバランス良く盛り付けます。',
      omakasePriceLabel: 'おまかせ通常価格',
      orOneTicket: 'または定期パス1枚（25,000đ相当）',
      chefHintLabel: '👨‍🍳 本日の料理長おすすめ構成: ',
      prefTitle: 'お好み・アレルギー設定（選択内容に応じて調理いたします）:',
      previewOmakaseBtn: '本日のおまかせ組み合わせ例を表示',
      previewResultTitle: '🍱 本日のおまかせ構成イメージ',
      mainDishLabel: '主菜',
      sideDishLabel: '副菜',
      soupLabel: 'スープ',
      portionCommit: '保証分量:',
      customNoteLabel: '厨房モニターへ直接送る個別リクエストメモ:',
      customNotePlaceholder: '例：ネギ抜き、タレ多め、レンジ対応の1段弁当箱に詰めてください...',
      step3Badge: '⚡ ピーク時でも並ばず受け取り',
      step3Title: '受取時間帯の選択（優先レーン＆スマート保温ロッカー）',
      slotsRemainingPrefix: '残り',
      slotsRemainingSuffix: '枠',
      summaryTitle: 'ご予約内容の確認',
      summaryHygienePrefix: '衛生ランク',
      summaryStallLabel: '調理店舗:',
      summaryCamNote: '📹 厨房ライブカメラで調理過程をリアルタイム視聴可能',
      summaryMealLabel: '選択したメニュー:',
      summaryOmakaseName: '🍱 シェフおまかせバランス弁当',
      summaryPrefLabel: 'お好み設定:',
      summaryStandardPref: '標準スタイル',
      summarySlotLabel: '受取時間＆優先受取場所:',
      summaryQrHint: '✅ QRコード提示で待ち時間15秒・行列に並ぶ必要はありません！',
      paymentTitle: 'お支払い方法:',
      payByTicketTitle: '定期ミールパスを1枚使用（おすすめ）',
      payByTicketDescPrefix: '現在',
      payByTicketDescSuffix: '枚のパスを保有 • 最大30%お得',
      oneTicketBadge: 'パス1枚',
      payByWalletTitle: '学生ウォレット残高で都度払い',
      walletBalancePrefix: 'ウォレット残高:',
      confirmOrderBtn: '予約を確定して厨房カメラを見る',
    },
    kitchen: {
      liveCamBadge: '厨房ライブ配信中',
      tempLabel: '厨房内温度:',
      aiCheckTitle: '✓ AI衛生モニタリング正常稼働中',
      aiCheckDesc: 'マスク・衛生手袋・調理帽の着用100%確認済み',
      currentBatchLabel: '現在の調理ステータス:',
      viewLogBtn: '本日の食材記録を見る',
      trackingOrderPrefix: '調理追跡中の注文',
      simulateNextBtn: '⏭️ 次の調理ステップへ進める',
      steps: [
        {
          title: '1. 注文確定＆お好みメモを厨房モニターへ送信完了',
        },
        {
          title: '2. 新鮮食材の検品＆規定分量（タンパク質150g以上）の計量',
          desc: 'オゾン殺菌洗浄済みの安全な野菜と当日朝納品のお肉を使用',
        },
        {
          title: '3. シェフが加熱調理中（ライブカメラで配信中）',
          desc: '出来立てを65°C保温・抗菌仕様の弁当容器へ盛り付け中',
        },
        {
          title: '4. 優先受取レーン／保温ロッカーへ格納完了！',
          descPrefix: '指定枠',
          descSuffix: 'にて並ばずにお受け取りいただけます',
        },
      ],
      lockerBadge: '優先受取レーン／スマート保温ロッカー',
      pickupTimeLabel: '受取予定時間:',
      authCodeLabel: '認証コード:',
      scanQrText: 'QRで解錠',
      selfZoneTitle: '自炊弁当サポート：電子レンジ＆1段弁当箱洗浄スペース予約',
      selfZoneSubtitle:
        '自宅から持参したお弁当を、ピーク時でも順番待ちなしで温め・洗浄できる専用清潔スペースです：',
      currentSelfSlotPrefix: '現在の予約枠:',
      bookSlotPrefix: '予約する:',
    },
    mealpass: {
      badge: '💳 食費を抑えて安心・清潔なランチを計画的に',
      title: '定額ミールパス（週・月）— 衛生Aランクの昼食が1食 25,000đ',
      subtitle:
        '衛生面や分量が不安な周辺店舗で毎日35,000đ〜50,000đを払う代わりに、定額ミールパスなら安全基準をクリアした学食・提携店の温かい昼食をお得な固定価格で確保できます。',
      currentTicketsLabel: '保有ミールパス残数',
      ticketsUnit: '枚',
      retailPricePrefix: '通常合計価格:',
      perMealSuffix: '/ 1食あたり',
      forMealsPrefix: '計',
      mealsUnit: '食分',
      buyPlanBtnPrefix: 'このプランを購入 (+',
      buyPlanBtnSuffix: ' 食分チャージ)',
    },
    reviews: {
      badge: '💬 実際に食べた学生による信頼できる評価',
      formTitle: '店舗レビュー投稿・匿名の衛生改善レポート',
      formSubtitle:
        '後輩や他の学生が失敗せず良いお店を選べるよう、分量・味・衛生面のリアルな評価を共有しましょう。',
      modeReview: '⭐ 食事レビューを投稿',
      modeReport: '🚨 衛生問題を匿名報告',
      selectStallLabel: '対象店舗を選択:',
      scoreOverall: '総合評価',
      scoreHygiene: '衛生・清潔度',
      scorePortion: '量の満足度',
      starsUnit: 'つ星 ⭐',
      pointsUnit: '/5 点',
      fullPortionUnit: '/5 満点',
      commentLabelNormal: '実際に食べた感想（分量・清潔さ・受け取りのスムーズさなど）:',
      commentLabelReport: '衛生面で改善してほしい点（投稿者の個人情報は完全に匿名化されます）:',
      commentPlaceholderNormal: '例：30,000đのおまかせ弁当でもお肉たっぷりで清潔！QRロッカーで即受け取れました。',
      commentPlaceholderReport: '例：ピーク時間帯にカトラリー置き場が少し濡れていたので改善をお願いします...',
      submitReviewBtn: '認証済み学生レビューを投稿',
      submitReportBtn: '管理委員会へ匿名で衛生報告を送信',
      feedTitle: '学生のリアルな口コミ＆衛生モニタリング履歴',
      feedSubtitle: '実際に注文・受取を完了した学生のみが評価を投稿できる信頼性の高いシステムです',
      verifiedBadge: '100% 注文認証済みレビュー',
      hygieneScorePrefix: '衛生評価:',
      managerReplyPrefix: '管理委員会からの回答:',
    },
    modal: {
      badge: '食品安全・食材トレーサビリティ公開情報',
      inspectedByPrefix: '監査担当:',
      ingredientTableTitle: '本日朝に納品された新鮮食材の産地・検品ログ:',
      originPrefix: '生産・供給元:',
      importedAtPrefix: '納品時刻',
      quantityPrefix: '納品量:',
      storageTempPrefix: '保管温度:',
      weeklyPhotoCaption: '📸 今週撮影された実際の厨房衛生チェック写真',
      criteriaTitle: 'クリア済みの衛生管理チェック項目:',
      closeBtn: '閉じる',
      orderThisStallBtn: 'この店舗でお弁当を予約する',
    },
    footer: {
      left: 'UniBite — スマート学食予約＆食品衛生可視化プラットフォーム',
      right: '事前予約・おまかせ • 厨房カメラ • A/B/C衛生ランク • 食材ログ • 定額ミールパス',
    },
    toasts: {
      noTickets: 'ミールパスの残数がありません！定額パスを購入するかウォレット決済を選択してください。',
      lowWallet: 'ウォレット残高が不足しています！',
      orderSuccess: '予約が完了しました！厨房ライブカメラで調理状況を確認できます。',
      planSuccessPrefix: 'プラン登録完了！ミールパス +',
      planSuccessSuffix: ' 食分がアカウントに追加されました。',
      emptyReview: 'レビュー内容または報告内容を入力してください。',
      reportSubmitted: '匿名の衛生報告を送信しました。管理委員会および店舗へ通知されました。',
      reviewSubmitted: 'レビューを投稿しました！学生コミュニティへのご協力ありがとうございます。',
      crowdUpdated: '各店舗のリアルタイム混雑状況を更新しました！',
      stepUpdated: '厨房の調理ステップが更新されました！',
      selfSlotBookedPrefix: '電子レンジ＆洗浄スペースを予約しました: ',
    },
  },
};

export default function App() {
  // Language Mode: 'vi' or 'jp' (Separate clean modes, no stacked text)
  const [lang, setLang] = useState(() => localStorage.getItem('unibite_lang') || 'vi');
  const t = UI_TEXT[lang];

  const [activeTab, setActiveTab] = useState('explore'); // explore | order | kitchen | mealpass | reviews

  // Shops & Filters
  const [shops, setShops] = useState(INITIAL_SHOPS);
  const [selectedFilter, setSelectedFilter] = useState('all'); // all | gradeA | under30k | lowCrowd
  const [selectedShopId, setSelectedShopId] = useState('shop-1');
  const [inspectModalShop, setInspectModalShop] = useState(null);

  // Ordering & Omakase State
  const [orderMode, setOrderMode] = useState('omakase'); // omakase | menu
  const [selectedMenuId, setSelectedMenuId] = useState('m-101');
  const [selectedPrefs, setSelectedPrefs] = useState(['no-onion', 'high-protein', 'reheat-box']);
  const [customNote, setCustomNote] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState('slot-2');
  const [paymentMethod, setPaymentMethod] = useState('ticket'); // ticket | wallet
  const [omakasePreview, setOmakasePreview] = useState(null);

  // Student Wallet & Meal Pass State
  const [mealTickets, setMealTickets] = useState(() => {
    const saved = localStorage.getItem('unibite_tickets');
    return saved !== null ? Number(saved) : 8;
  });
  const [walletBalance, setWalletBalance] = useState(() => {
    const saved = localStorage.getItem('unibite_wallet');
    return saved !== null ? Number(saved) : 185000;
  });

  // Active Order State (with localized fields)
  const [orderState, setOrderState] = useState({
    id: 'ORD-8829',
    shopId: 'shop-1',
    slotTime: '11:15 - 11:30',
    lockerNumber: 'A08',
    qrCode: 'UNIBITE-A08-8829',
    step: 2,
    createdAt: '10:40',
    isOmakase: true,
    menuId: 'm-101',
    prefs: ['no-onion', 'high-protein', 'reheat-box'],
  });

  // Self-bring Microwave / Washing Slot State
  const [bookedSelfSlotIndex, setBookedSelfSlotIndex] = useState({ zoneIdx: 0, slotIdx: 1 });

  // Reviews & Hygiene Alert State
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
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
      setLiveTime(new Date().toLocaleTimeString(lang === 'vi' ? 'vi-VN' : 'ja-JP'));
    }, 1000);
    return () => clearInterval(timer);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('unibite_lang', lang);
    document.documentElement.lang = lang === 'vi' ? 'vi' : 'ja';
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('unibite_tickets', String(mealTickets));
  }, [mealTickets]);

  useEffect(() => {
    localStorage.setItem('unibite_wallet', String(walletBalance));
  }, [walletBalance]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  const selectedShop = shops.find((s) => s.id === selectedShopId) || shops[0];
  const selectedShopL = selectedShop[lang];
  const selectedSlot = PICKUP_SLOTS.find((s) => s.id === selectedSlotId) || PICKUP_SLOTS[0];
  const selectedSlotL = selectedSlot[lang];

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

  // Generate Omakase Dish Combination Preview in current language
  const handleGenerateOmakasePreview = () => {
    const combos =
      lang === 'vi'
        ? {
            mains: [
              'Ức gà áp chảo sốt Teriyaki (150g)',
              'Cá hồi phi lê sốt chanh dây (140g)',
              'Thịt bò Mỹ xào bông cải xanh (145g)',
              'Sườn non nướng mật ong rừng (155g)',
            ],
            sides: [
              'Trứng cuộn Tamagoyaki + Đậu hũ non sốt nấm',
              'Salad bắp cải mè rang + Kim chi cải thảo',
              'Rau củ luộc thập cẩm + Trứng ngâm tương',
            ],
            soups: ['Canh rong biển thịt băm nóng', 'Canh chua nấm kim châm', 'Canh cải ngọt nấu tôm'],
          }
        : {
            mains: [
              '照り焼きチキン胸肉ステーキ (150g)',
              'サーモンのパッションフルーツソース焼き (140g)',
              '牛肉とブロッコリーのオイスター炒め (145g)',
              'ハニーローストポークリブ (155g)',
            ],
            sides: [
              '厚焼き玉子＋きのこあんかけ豆腐',
              '胡麻ドレッシングキャベツサラダ＋白菜キムチ',
              '彩り温野菜＋半熟味玉',
            ],
            soups: ['豚ひき肉入りわかめスープ', 'えのき茸の酸辣スープ', '小松菜と海老のスープ'],
          };

    setOmakasePreview({
      main: combos.mains[Math.floor(Math.random() * combos.mains.length)],
      side: combos.sides[Math.floor(Math.random() * combos.sides.length)],
      soup: combos.soups[Math.floor(Math.random() * combos.soups.length)],
      calories: `${Math.floor(560 + Math.random() * 90)} kcal`,
    });
  };

  // Place Pre-order / Omakase Order
  const handlePlaceOrder = () => {
    const chosenMenu =
      selectedShopL.menu.find((m) => m.id === selectedMenuId) || selectedShopL.menu[0];
    const cashPrice = orderMode === 'omakase' ? selectedShop.omakasePrice : chosenMenu.price;

    if (paymentMethod === 'ticket') {
      if (mealTickets <= 0) {
        showToast(t.toasts.noTickets);
        return;
      }
      setMealTickets((prev) => prev - 1);
    } else {
      if (walletBalance < cashPrice) {
        showToast(t.toasts.lowWallet);
        return;
      }
      setWalletBalance((prev) => prev - cashPrice);
    }

    const lockerNum = `A${Math.floor(10 + Math.random() * 80)}`;
    setOrderState({
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      shopId: selectedShop.id,
      slotTime: selectedSlot.time,
      lockerNumber: lockerNum,
      qrCode: `UNIBITE-${lockerNum}-${Math.floor(1000 + Math.random() * 9000)}`,
      step: 1,
      createdAt: new Date().toLocaleTimeString(lang === 'vi' ? 'vi-VN' : 'ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isOmakase: orderMode === 'omakase',
      menuId: selectedMenuId,
      prefs: [...selectedPrefs],
      customNote,
    });

    showToast(t.toasts.orderSuccess);
    setActiveTab('kitchen');
  };

  // Buy Meal Plan
  const handleBuyMealPlan = (plan) => {
    setMealTickets((prev) => prev + plan.meals);
    showToast(`${t.toasts.planSuccessPrefix}${plan.meals}${t.toasts.planSuccessSuffix}`);
  };

  // Submit Review or Hygiene Alert
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      showToast(t.toasts.emptyReview);
      return;
    }

    const targetShop = shops.find((s) => s.id === reviewShopId) || shops[0];
    const newRev = {
      id: `rev-${Date.now()}`,
      shopId: targetShop.id,
      rating: reviewRating,
      hygieneRating: reviewHygiene,
      portionRating: reviewPortion,
      isWarning: isHygieneReport,
      vi: {
        shopName: targetShop.vi.name,
        studentName: isHygieneReport
          ? 'Ẩn danh (Sinh viên đã xác thực)'
          : 'Sinh viên (Đã xác thực đơn hàng)',
        verifiedOrder: isHygieneReport
          ? 'Phản ánh Vệ sinh An toàn Thực phẩm'
          : 'Đã đặt suất ăn qua UniBite',
        timeAgo: 'Vừa xong',
        comment: reviewText,
        tags: isHygieneReport
          ? ['Cảnh báo vệ sinh', 'Đã gửi Ban quản lý']
          : ['Đúng định lượng', 'Đáng tiền', 'Sinh viên xác thực'],
        managerReply: isHygieneReport
          ? 'Hệ thống tự động: Đã gửi thông báo ẩn danh tới Ban Quản Lý & Chủ quầy để kiểm tra khắc phục ngay.'
          : null,
      },
      jp: {
        shopName: targetShop.jp.name,
        studentName: isHygieneReport
          ? '匿名ユーザー（認証済み学生）'
          : '認証済み学生ユーザー',
        verifiedOrder: isHygieneReport
          ? '食品衛生フィードバック報告'
          : 'UniBiteで注文・受取済み',
        timeAgo: 'たった今',
        comment: reviewText,
        tags: isHygieneReport
          ? ['衛生改善リクエスト', '管理委員会へ通知済み']
          : ['分量保証', '高コスパ', '注文認証済み'],
        managerReply: isHygieneReport
          ? '自動システム通知：管理委員会および店舗責任者へ匿名で改善要請が送信されました。'
          : null,
      },
    };

    setReviews([newRev, ...reviews]);

    if (isHygieneReport) {
      setShops((prevShops) =>
        prevShops.map((sh) =>
          sh.id === targetShop.id ? { ...sh, warningCount: sh.warningCount + 1 } : sh
        )
      );
      showToast(t.toasts.reportSubmitted);
    } else {
      showToast(t.toasts.reviewSubmitted);
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
    showToast(t.toasts.crowdUpdated);
  };

  const getCrowdBadge = (status, waitMin) => {
    if (status === 'low') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-live" />
          {t.explore.crowdLow} ({t.explore.waitPrefix} ~{waitMin}
          {t.explore.minutesShort})
        </span>
      );
    }
    if (status === 'medium') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse-live" />
          {t.explore.crowdMed} ({t.explore.waitPrefix} ~{waitMin}
          {t.explore.minutesShort})
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse-live" />
        {t.explore.crowdHigh} ({t.explore.waitPrefix} ~{waitMin}
        {t.explore.minutesShort})
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
          <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500 leading-none">
            {t.explore.hygieneBadgeTitle}
          </div>
          <div className="text-xs font-extrabold text-slate-900 mt-0.5">
            {t.explore.hygieneGradePrefix} {grade} ({score}/100)
          </div>
        </div>
      </div>
    );
  };

  // Compute localized active order details
  const orderShop = shops.find((s) => s.id === orderState.shopId) || shops[0];
  const orderShopL = orderShop[lang];
  const orderItemName = orderState.isOmakase
    ? lang === 'vi'
      ? `Suất Omakase Chuẩn Sạch (${orderShopL.name})`
      : `シェフおまかせバランス弁当 (${orderShopL.name})`
    : (orderShopL.menu.find((m) => m.id === orderState.menuId) || orderShopL.menu[0]).name;

  const orderPrefSummary = OMAKASE_PREFERENCES.filter((p) => orderState.prefs.includes(p.id))
    .map((p) => p[lang])
    .join(' • ');

  const currentSelfZone = SELF_BRING_ZONES[bookedSelfSlotIndex.zoneIdx] || SELF_BRING_ZONES[0];
  const currentSelfSlotText = `${currentSelfZone[lang].name} — ${
    currentSelfZone[lang].slots[bookedSelfSlotIndex.slotIdx] || currentSelfZone[lang].slots[0]
  }`;

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
                  Uni<span className="text-emerald-600">Bite</span>
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Smart Campus Lunch
                </span>
              </div>
              <p className="text-xs text-slate-500">{t.tagline}</p>
            </div>
          </div>

          {/* Right Controls: Separate Language Switcher (VI | JP), Meal Pass & Wallet */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Segmented Language Mode Switcher */}
            <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <Globe className="w-3.5 h-3.5 text-slate-500 ml-2 mr-1" />
              <button
                onClick={() => setLang('vi')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  lang === 'vi'
                    ? 'bg-white text-emerald-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇻🇳 Tiếng Việt
              </button>
              <button
                onClick={() => setLang('jp')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  lang === 'jp'
                    ? 'bg-white text-emerald-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇯🇵 日本語
              </button>
            </div>

            {/* Meal Pass Tickets Badge */}
            <div
              onClick={() => setActiveTab('mealpass')}
              className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-xl cursor-pointer transition"
            >
              <Ticket className="w-4 h-4 text-emerald-600" />
              <div className="text-xs">
                <span className="text-slate-600">{t.ticketLabel} </span>
                <span className="font-extrabold text-emerald-700">
                  {mealTickets} {t.ticketUnit}
                </span>
              </div>
            </div>

            {/* Student Wallet */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
              <span className="text-slate-500">{t.walletLabel}</span>
              <span className="font-bold text-slate-800">
                {walletBalance.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-slate-100 bg-slate-50/60">
          <nav className="flex items-center gap-1.5 overflow-x-auto py-2">
            {[
              { id: 'explore', label: t.tabs.explore, icon: ShieldCheck },
              { id: 'order', label: t.tabs.order, icon: Sparkles },
              { id: 'kitchen', label: t.tabs.kitchen, icon: Video, badge: 'LIVE' },
              { id: 'mealpass', label: t.tabs.mealpass, icon: Ticket },
              { id: 'reviews', label: t.tabs.reviews, icon: Star },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`ml-1 px-1.5 py-0.5 text-[10px] rounded-md font-extrabold ${
                        isActive ? 'bg-white text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Clean Production Hero Banner on Explore Tab */}
        {activeTab === 'explore' && (
          <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-700/80">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                {t.hero.badge}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                {t.hero.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('order')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {t.hero.ctaOrder}
                </button>
                <button
                  onClick={() => setActiveTab('mealpass')}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/15 transition cursor-pointer flex items-center gap-2"
                >
                  <Ticket className="w-4 h-4 text-emerald-300" />
                  {t.hero.ctaPass}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
              <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
                <div className="text-xs font-extrabold text-emerald-300">{t.hero.stat1Title}</div>
                <div className="text-xs text-slate-300 mt-1">{t.hero.stat1Desc}</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
                <div className="text-xs font-extrabold text-amber-300">{t.hero.stat2Title}</div>
                <div className="text-xs text-slate-300 mt-1">{t.hero.stat2Desc}</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10">
                <div className="text-xs font-extrabold text-teal-300">{t.hero.stat3Title}</div>
                <div className="text-xs text-slate-300 mt-1">{t.hero.stat3Desc}</div>
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
                  {t.explore.filterTitle}
                </span>
                {[
                  { id: 'all', label: t.explore.filterAll },
                  { id: 'gradeA', label: t.explore.filterGradeA },
                  { id: 'under30k', label: t.explore.filterUnder30k },
                  { id: 'lowCrowd', label: t.explore.filterLowCrowd },
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
                {t.explore.refreshCrowd}
              </button>
            </div>

            {/* Shop Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filteredShops.map((shop) => {
                const shopL = shop[lang];
                return (
                  <div
                    key={shop.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition overflow-hidden flex flex-col"
                  >
                    {/* Top Image + Hygiene Grade A/B/C + Crowd Status */}
                    <div className="relative h-48 bg-slate-200">
                      <img
                        src={shop.image}
                        alt={shopL.name}
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
                        {t.explore.watchCamBtn}
                      </button>

                      {/* Bottom overlay: Crowd Status */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                        {getCrowdBadge(shop.crowdStatus, shop.walkInWaitMinutes)}
                        <span className="text-xs font-bold text-white bg-emerald-600/90 px-2.5 py-1 rounded-full">
                          {t.explore.priorityLaneBadge} {shop.priorityWaitMinutes}{' '}
                          {t.explore.minutesShort}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                              {shopL.category}
                            </span>
                            <h3 className="font-extrabold text-base text-slate-900 leading-snug mt-0.5">
                              {shopL.name}
                            </h3>
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
                              <span className="font-bold">
                                {t.explore.warningBannerPrefix} ({shop.warningCount}):
                              </span>{' '}
                              {t.explore.warningBannerDesc}
                            </div>
                          </div>
                        )}

                        {/* Crowd Meter Bar */}
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-slate-600 flex items-center gap-1">
                              <Users className="w-3.5 h-3.5 text-slate-400" />
                              {t.explore.currentCrowdLabel}
                            </span>
                            <span className="font-bold text-slate-900">
                              {shop.crowdCount}/{shop.maxCapacity} {t.explore.peopleUnit}
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
                              {t.explore.ingredientLogTitle} ({shopL.ingredientLogs.length}{' '}
                              {t.explore.batchesUnit})
                            </span>
                            <span className="text-[11px] font-semibold text-emerald-700">
                              {t.explore.inspectedAt} {shopL.lastInspected}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2">
                            ✅{' '}
                            {shopL.ingredientLogs
                              .map((i) => `${i.item} (${i.origin})`)
                              .join(' • ')}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-500">{t.explore.priceCommitLabel}</span>
                          <span className="font-extrabold text-emerald-700 text-sm">
                            {shopL.priceRange}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setInspectModalShop(shop)}
                            className="px-3 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            {t.explore.btnInspectLog}
                          </button>
                          <button
                            onClick={() => {
                              setSelectedShopId(shop.id);
                              setSelectedMenuId(shopL.menu[0]?.id || 'm-101');
                              setActiveTab('order');
                            }}
                            className="px-3 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Sparkles className="w-4 h-4" />
                            {t.explore.btnOrderNow}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 2: ĐẶT TRƯỚC SUẤT ĂN, OMAKASE ONLINE & CHỌN GIỜ NHẬN ĐỒ
        ===================================================================== */}
        {activeTab === 'order' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Columns */}
            <div className="lg:col-span-8 space-y-6">
              {/* Step 1: Select Verified Canteen Stall */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">
                      1
                    </span>
                    {t.order.step1Title}
                  </h2>
                  <button
                    onClick={() => setInspectModalShop(selectedShop)}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    {t.order.viewIngredientBtn}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {shops.map((sh) => {
                    const shL = sh[lang];
                    const active = sh.id === selectedShopId;
                    return (
                      <div
                        key={sh.id}
                        onClick={() => {
                          setSelectedShopId(sh.id);
                          setSelectedMenuId(shL.menu[0]?.id);
                        }}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition ${
                          active
                            ? 'border-emerald-600 bg-emerald-50/50'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-emerald-600 text-white">
                            {t.explore.hygieneGradePrefix} {sh.hygieneGrade}
                          </span>
                          <span className="text-xs font-bold text-emerald-700">
                            Omakase {sh.omakasePrice / 1000}k
                          </span>
                        </div>
                        <div className="font-bold text-xs text-slate-900 line-clamp-1">
                          {shL.name}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          {t.order.priorityWaitLabel}: {sh.priorityWaitMinutes}
                          {t.explore.minutesShort} • {t.order.walkInWaitLabel}: {sh.walkInWaitMinutes}
                          {t.explore.minutesShort}
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
                    {t.order.step2Title}
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
                      {t.order.modeOmakase}
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
                      {t.order.modeMenu}
                    </button>
                  </div>
                </div>

                {orderMode === 'omakase' ? (
                  <div className="space-y-4 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 p-4 rounded-2xl border border-emerald-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-200/70">
                      <div>
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-600 text-white mb-1">
                          {t.order.omakaseBadge}
                        </span>
                        <h3 className="font-extrabold text-slate-900 text-base">
                          {t.order.omakaseTitle}
                        </h3>
                        <p className="text-xs text-slate-600 mt-0.5">{t.order.omakaseDesc}</p>
                      </div>
                      <div className="text-right shrink-0 bg-white px-3.5 py-2 rounded-xl border border-emerald-200 shadow-2xs">
                        <div className="text-[11px] text-slate-500">
                          {t.order.omakasePriceLabel}
                        </div>
                        <div className="text-lg font-extrabold text-emerald-700">
                          {selectedShop.omakasePrice.toLocaleString('vi-VN')}đ
                        </div>
                        <div className="text-[11px] font-bold text-amber-700">
                          {t.order.orOneTicket}
                        </div>
                      </div>
                    </div>

                    {/* Kitchen Hint */}
                    <div className="p-3 rounded-xl bg-white border border-emerald-200/80 text-xs text-slate-700">
                      <span className="font-bold text-emerald-800">{t.order.chefHintLabel}</span>
                      {selectedShopL.omakaseHint}
                    </div>

                    {/* Personal Notes / Preferences Chips */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-2">
                        {t.order.prefTitle}
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
                              <span>{pref[lang]}</span>
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
                        {t.order.previewOmakaseBtn}
                      </button>

                      {omakasePreview && (
                        <div className="flex-1 bg-white p-3 rounded-xl border border-amber-300 text-xs">
                          <div className="font-bold text-slate-900">
                            {t.order.previewResultTitle} ({omakasePreview.calories}):
                          </div>
                          <div className="text-slate-600 mt-0.5">
                            • <b>{t.order.mainDishLabel}:</b> {omakasePreview.main} |{' '}
                            <b>{t.order.sideDishLabel}:</b> {omakasePreview.side} |{' '}
                            <b>{t.order.soupLabel}:</b> {omakasePreview.soup}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Self-select Daily Menu Mode */
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {selectedShopL.menu.map((item) => {
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
                                ⚖️ <b>{t.order.portionCommit}</b> {item.portion}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-1 pt-1">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800"
                                >
                                  {tag}
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
                    {t.order.customNoteLabel}
                  </label>
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder={t.order.customNotePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-emerald-600 bg-white"
                  />
                </div>
              </div>

              {/* Step 3: Select Off-peak Pickup Time Slot */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                <div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 mb-1">
                    {t.order.step3Badge}
                  </span>
                  <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">
                      3
                    </span>
                    {t.order.step3Title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {PICKUP_SLOTS.map((slot) => {
                    const slotL = slot[lang];
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
                            {t.order.slotsRemainingPrefix} {slot.remaining}{' '}
                            {t.order.slotsRemainingSuffix}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-slate-700">{slotL.label}</div>
                        <div className="text-[11px] text-emerald-700 font-medium mt-1">
                          🎁 {slotL.bonus}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1">📍 {slotL.lockerZone}</div>
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
                    {t.order.summaryTitle}
                  </h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    {t.order.summaryHygienePrefix} {selectedShop.hygieneGrade}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-slate-400 font-semibold uppercase text-[10px]">
                      {t.order.summaryStallLabel}
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{selectedShopL.name}</div>
                    <div className="text-emerald-700 font-medium">{t.order.summaryCamNote}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="text-slate-400 font-semibold uppercase text-[10px]">
                      {t.order.summaryMealLabel}
                    </div>
                    <div className="font-bold text-slate-900 text-sm">
                      {orderMode === 'omakase'
                        ? t.order.summaryOmakaseName
                        : selectedShopL.menu.find((m) => m.id === selectedMenuId)?.name}
                    </div>
                    {orderMode === 'omakase' && (
                      <div className="text-slate-600 mt-1">
                        <b>{t.order.summaryPrefLabel}</b>{' '}
                        {OMAKASE_PREFERENCES.filter((p) => selectedPrefs.includes(p.id))
                          .map((p) => p[lang])
                          .join(', ') || t.order.summaryStandardPref}
                      </div>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <div className="text-emerald-700 font-bold uppercase text-[10px]">
                      {t.order.summarySlotLabel}
                    </div>
                    <div className="font-extrabold text-slate-900 text-sm">
                      ⏰ {selectedSlot.time} ({selectedSlotL.label})
                    </div>
                    <div className="text-emerald-800">📍 {selectedSlotL.lockerZone}</div>
                    <div className="text-[11px] text-slate-600">{t.order.summaryQrHint}</div>
                  </div>

                  {/* Payment Selector */}
                  <div className="space-y-2 pt-2">
                    <div className="font-bold text-slate-800">{t.order.paymentTitle}</div>
                    <label
                      onClick={() => setPaymentMethod('ticket')}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition ${
                        paymentMethod === 'ticket'
                          ? 'border-emerald-600 bg-emerald-50/50'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Ticket className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div>
                          <div className="font-bold text-slate-900">{t.order.payByTicketTitle}</div>
                          <div className="text-[11px] text-slate-500">
                            {t.order.payByTicketDescPrefix} {mealTickets}{' '}
                            {t.order.payByTicketDescSuffix}
                          </div>
                        </div>
                      </div>
                      <span className="font-extrabold text-emerald-700 shrink-0">
                        {t.order.oneTicketBadge}
                      </span>
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
                        <Award className="w-5 h-5 text-slate-600 shrink-0" />
                        <div>
                          <div className="font-bold text-slate-900">{t.order.payByWalletTitle}</div>
                          <div className="text-[11px] text-slate-500">
                            {t.order.walletBalancePrefix} {walletBalance.toLocaleString('vi-VN')}đ
                          </div>
                        </div>
                      </div>
                      <span className="font-extrabold text-slate-900 shrink-0">
                        {(orderMode === 'omakase'
                          ? selectedShop.omakasePrice
                          : selectedShopL.menu.find((m) => m.id === selectedMenuId)?.price || 32000
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
                  {t.order.confirmOrderBtn}
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
              {/* Left 7 Columns: Live Kitchen Camera Feed */}
              <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl overflow-hidden border border-slate-800 shadow-lg flex flex-col justify-between">
                {/* Camera Top Bar */}
                <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-600 text-white text-xs font-extrabold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse-live" />
                      {t.kitchen.liveCamBadge}
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
                          📹 {s[lang].name}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />

                  {/* Top HUD */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                    <div className="bg-black/70 backdrop-blur px-3 py-1.5 rounded-lg border border-white/15 text-emerald-300">
                      🌡️ {t.kitchen.tempLabel} {selectedShopL.kitchenTemp}
                    </div>
                    <div className="bg-black/70 backdrop-blur px-3 py-1.5 rounded-lg border border-white/15 text-white">
                      🕒 {liveTime}
                    </div>
                  </div>

                  {/* Hygiene Detection Box */}
                  <div className="absolute top-1/3 left-6 sm:left-8 border-2 border-emerald-400/90 bg-emerald-500/10 rounded-xl px-3.5 py-2.5 backdrop-blur-xs max-w-sm">
                    <div className="text-[11px] font-mono uppercase font-bold text-emerald-300">
                      {t.kitchen.aiCheckTitle}
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5">
                      {selectedShopL.chefOnDuty} • {t.kitchen.aiCheckDesc}
                    </div>
                  </div>

                  {/* Bottom Live Batch Status */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur p-3.5 rounded-xl border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Flame className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />
                      <div>
                        <div className="text-[11px] text-emerald-400 font-bold uppercase">
                          {t.kitchen.currentBatchLabel}
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-white">
                          {selectedShopL.currentCookingBatch}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setInspectModalShop(selectedShop)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shrink-0 cursor-pointer"
                    >
                      {t.kitchen.viewLogBtn}
                    </button>
                  </div>
                </div>

                {/* Hygiene Checklist Footer */}
                <div className="p-4 bg-slate-900 grid grid-cols-1 sm:grid-cols-2 gap-2.5 border-t border-slate-800">
                  {selectedShopL.hygieneChecklist.map((item, idx) => (
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
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 gap-2">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase text-emerald-700">
                        {t.kitchen.trackingOrderPrefix} #{orderState.id}
                      </span>
                      <h3 className="font-extrabold text-base text-slate-900">
                        {orderItemName}
                      </h3>
                    </div>
                    <button
                      onClick={() => {
                        setOrderState((prev) => ({ ...prev, step: (prev.step + 1) % 4 }));
                        showToast(t.toasts.stepUpdated);
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 cursor-pointer shrink-0"
                    >
                      {t.kitchen.simulateNextBtn}
                    </button>
                  </div>

                  {/* 4-Step Progress Bar */}
                  <div className="space-y-3">
                    {[
                      {
                        step: 0,
                        title: t.kitchen.steps[0].title,
                        desc: `${orderState.createdAt} • ${
                          orderPrefSummary || t.order.summaryStandardPref
                        }`,
                      },
                      {
                        step: 1,
                        title: t.kitchen.steps[1].title,
                        desc: t.kitchen.steps[1].desc,
                      },
                      {
                        step: 2,
                        title: t.kitchen.steps[2].title,
                        desc: t.kitchen.steps[2].desc,
                      },
                      {
                        step: 3,
                        title: t.kitchen.steps[3].title,
                        desc: `${t.kitchen.steps[3].descPrefix} ${orderState.slotTime} ${t.kitchen.steps[3].descSuffix}`,
                      },
                    ].map((st) => {
                      const done = orderState.step >= st.step;
                      const current = orderState.step === st.step;
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
                        {t.kitchen.lockerBadge}
                      </span>
                      <div className="text-sm font-extrabold">
                        Locker #{orderState.lockerNumber}
                      </div>
                      <div className="text-xs text-emerald-300">
                        {t.kitchen.pickupTimeLabel} <b>{orderState.slotTime}</b>
                      </div>
                      <div className="text-[11px] text-slate-300 font-mono">
                        {t.kitchen.authCodeLabel} {orderState.qrCode}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-xl text-slate-900 flex flex-col items-center shrink-0">
                      <QrCode className="w-14 h-14 text-slate-900" />
                      <span className="text-[10px] font-extrabold mt-1">
                        {t.kitchen.scanQrText}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Self-Bring Meal Prep & Microwave Booking */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2.5">
                    <Microwave className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">
                        {t.kitchen.selfZoneTitle}
                      </h4>
                      <p className="text-xs text-slate-500">{t.kitchen.selfZoneSubtitle}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold">
                    ✅ {t.kitchen.currentSelfSlotPrefix} {currentSelfSlotText}
                  </div>

                  <div className="space-y-2">
                    {SELF_BRING_ZONES.map((z, zIdx) => {
                      const zL = z[lang];
                      return (
                        <div
                          key={z.id}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2"
                        >
                          <div className="font-bold text-slate-800">{zL.name}</div>
                          <div className="text-[11px] text-slate-500">🛠️ {zL.equipment}</div>
                          <div className="flex flex-wrap gap-1.5">
                            {zL.slots.map((sl, sIdx) => (
                              <button
                                key={sl}
                                onClick={() => {
                                  setBookedSelfSlotIndex({ zoneIdx: zIdx, slotIdx: sIdx });
                                  showToast(`${t.toasts.selfSlotBookedPrefix}${sl}`);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-600 hover:text-white border border-slate-200 text-[11px] font-semibold transition cursor-pointer"
                              >
                                {t.kitchen.bookSlotPrefix} {sl}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
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
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1 text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {t.mealpass.badge}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900">{t.mealpass.title}</h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                  {t.mealpass.subtitle}
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-right shrink-0">
                <div className="text-xs text-emerald-800 font-semibold">
                  {t.mealpass.currentTicketsLabel}
                </div>
                <div className="text-3xl font-extrabold text-emerald-700">
                  {mealTickets} {t.mealpass.ticketsUnit}
                </div>
              </div>
            </div>

            {/* Plans Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MEAL_PLANS.map((plan) => {
                const planL = plan[lang];
                return (
                  <div
                    key={plan.id}
                    className="bg-white rounded-2xl p-6 border-2 border-emerald-600/80 shadow-sm flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                          {planL.badge}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          {t.mealpass.retailPricePrefix}{' '}
                          {plan.originalPrice.toLocaleString('vi-VN')}đ
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-slate-900">{planL.name}</h3>

                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-emerald-700">
                          {plan.pricePerMeal.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">
                          {t.mealpass.perMealSuffix} ({plan.price.toLocaleString('vi-VN')}đ /{' '}
                          {t.mealpass.forMealsPrefix} {plan.meals} {t.mealpass.mealsUnit})
                        </span>
                      </div>

                      <ul className="space-y-2 pt-2">
                        {planL.perks.map((perk, idx) => (
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
                      {t.mealpass.buyPlanBtnPrefix}
                      {plan.meals}
                      {t.mealpass.buyPlanBtnSuffix}
                    </button>
                  </div>
                );
              })}
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
                    {t.reviews.badge}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">
                    {t.reviews.formTitle}
                  </h3>
                  <p className="text-xs text-slate-500">{t.reviews.formSubtitle}</p>
                </div>

                {/* Mode Switch */}
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
                    {t.reviews.modeReview}
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
                    {t.reviews.modeReport}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.reviews.selectStallLabel}
                  </label>
                  <select
                    value={reviewShopId}
                    onChange={(e) => setReviewShopId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                  >
                    {shops.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s[lang].name} ({t.explore.hygieneGradePrefix} {s.hygieneGrade})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-[11px] text-slate-500 font-semibold">
                      {t.reviews.scoreOverall}
                    </div>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="mt-1 font-extrabold text-xs bg-white border border-slate-200 rounded px-2 py-1"
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {n} {t.reviews.starsUnit}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-[11px] text-slate-500 font-semibold">
                      {t.reviews.scoreHygiene}
                    </div>
                    <select
                      value={reviewHygiene}
                      onChange={(e) => setReviewHygiene(Number(e.target.value))}
                      className="mt-1 font-extrabold text-xs bg-white border border-slate-200 rounded px-2 py-1"
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {n}
                          {t.reviews.pointsUnit}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-[11px] text-slate-500 font-semibold">
                      {t.reviews.scorePortion}
                    </div>
                    <select
                      value={reviewPortion}
                      onChange={(e) => setReviewPortion(Number(e.target.value))}
                      className="mt-1 font-extrabold text-xs bg-white border border-slate-200 rounded px-2 py-1"
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {n}
                          {t.reviews.fullPortionUnit}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isHygieneReport ? t.reviews.commentLabelReport : t.reviews.commentLabelNormal}
                  </label>
                  <textarea
                    rows={3}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder={
                      isHygieneReport
                        ? t.reviews.commentPlaceholderReport
                        : t.reviews.commentPlaceholderNormal
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
                  {isHygieneReport ? t.reviews.submitReportBtn : t.reviews.submitReviewBtn}
                </button>
              </form>
            </div>

            {/* Right 7 Columns: Verified Student Reviews Feed */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    {t.reviews.feedTitle} ({reviews.length})
                  </h3>
                  <p className="text-xs text-slate-500">{t.reviews.feedSubtitle}</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {t.reviews.verifiedBadge}
                </span>
              </div>

              {reviews.map((rev) => {
                const revL = rev[lang];
                return (
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
                            {revL.studentName}
                          </span>
                          <span className="text-[11px] text-slate-400">• {revL.timeAgo}</span>
                        </div>
                        <div className="text-xs font-semibold text-emerald-700 mt-0.5">
                          📍 {revL.shopName} —{' '}
                          <span className="text-slate-500">{revL.verifiedOrder}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-xs font-extrabold text-amber-800">
                          ⭐ {rev.rating}/5
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
                          {t.reviews.hygieneScorePrefix} {rev.hygieneRating}/5
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {revL.comment}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {revL.tags.map((tag, i) => (
                        <span
                          key={i}
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            rev.isWarning
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {revL.managerReply && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                        🛡️ <b>{t.reviews.managerReplyPrefix}</b> {revL.managerReply}
                      </div>
                    )}
                  </div>
                );
              })}
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
                  {t.modal.badge}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {inspectModalShop[lang].name}
                </h3>
                <p className="text-xs text-slate-500">
                  {t.modal.inspectedByPrefix} {inspectModalShop[lang].inspectorTeam} (
                  {inspectModalShop[lang].lastInspected})
                </p>
              </div>
              {getHygieneBadge(inspectModalShop.hygieneGrade, inspectModalShop.hygieneScore)}
            </div>

            {/* Daily Ingredient Origin Table */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                {t.modal.ingredientTableTitle}
              </h4>
              <div className="space-y-2">
                {inspectModalShop[lang].ingredientLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="font-extrabold text-slate-900">{log.item}</div>
                      <div className="text-slate-600">
                        {t.modal.originPrefix} {log.origin}
                      </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <div className="font-bold text-emerald-700">✅ {log.status}</div>
                      <div className="text-[11px] text-slate-500">
                        {t.modal.importedAtPrefix} {log.time} • {t.modal.quantityPrefix}{' '}
                        {log.quantity} • {t.modal.storageTempPrefix} {log.tempAtDelivery}
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
                  alt="Kitchen Inspection"
                  className="w-full h-40 object-cover"
                />
                <div className="p-2 bg-slate-100 text-[11px] font-semibold text-slate-700 text-center">
                  {t.modal.weeklyPhotoCaption}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-800">{t.modal.criteriaTitle}</div>
                {inspectModalShop[lang].hygieneChecklist.map((chk, i) => (
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
                {t.modal.closeBtn}
              </button>
              <button
                onClick={() => {
                  setSelectedShopId(inspectModalShop.id);
                  setInspectModalShop(null);
                  setActiveTab('order');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              >
                {t.modal.orderThisStallBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="font-semibold text-slate-700">{t.footer.left}</div>
          <div>{t.footer.right}</div>
        </div>
      </footer>
    </div>
  );
}
