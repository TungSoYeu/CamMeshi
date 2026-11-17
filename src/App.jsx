import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Video,
  Clock,
  Ticket,
  Star,
  AlertCircle,
  Check,
  QrCode,
  FileText,
  RefreshCw,
  ArrowRight,
  X,
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
    tagline: 'Hệ thống đặt trước bữa trưa & minh bạch vệ sinh học đường',
    ticketLabel: 'Vé định kỳ:',
    ticketUnit: 'suất',
    walletLabel: 'Số dư:',
    tabs: {
      explore: 'Quầy ăn & Vệ sinh',
      order: 'Đặt món & Omakase',
      kitchen: 'Camera bếp & Nhận đồ',
      mealpass: 'Gói vé định kỳ',
      reviews: 'Đánh giá & Phản ánh',
    },
    hero: {
      badge: 'Kiểm định nguyên liệu 05:30 mỗi sáng',
      title: 'Bữa trưa nóng sốt, đúng định lượng — chỉ từ 25.000đ/suất',
      subtitle:
        'Tra cứu trực tiếp điểm vệ sinh A/B/C, nhật ký nguyên liệu đầu ngày và camera nhà bếp. Đặt trước thực đơn yêu thích hoặc chọn chế độ bếp tự phối (Omakase) theo khẩu vị riêng, nhận đồ tại làn ưu tiên không cần xếp hàng giờ cao điểm.',
      ctaOrder: 'Đặt bữa trưa ngay',
      ctaPass: 'Gói vé tháng 25.000đ',
      stat1Title: 'Chuẩn vệ sinh A / B / C',
      stat1Desc: 'Công khai nguồn gốc nguyên liệu và ảnh kiểm tra bếp hàng tuần',
      stat2Title: 'Làn nhận đồ ưu tiên & Tủ khóa',
      stat2Desc: 'Quét mã QR nhận suất ăn trong 15 giây, không chờ đợi',
      stat3Title: 'Chế độ Omakase linh hoạt',
      stat3Desc: 'Đầu bếp phối món nóng sốt theo ghi chú khẩu vị cá nhân',
    },
    explore: {
      filterTitle: 'Bộ lọc',
      filterAll: 'Tất cả quầy',
      filterGradeA: 'Vệ sinh Hạng A',
      filterUnder30k: 'Omakase ≤ 30.000đ',
      filterLowCrowd: 'Ít người chờ',
      refreshCrowd: 'Cập nhật lượng khách',
      hygieneBadgeTitle: 'Vệ sinh',
      hygieneGradePrefix: 'Hạng',
      watchCamBtn: 'Xem bếp',
      priorityLaneBadge: 'Làn ưu tiên:',
      minutesShort: 'phút',
      crowdLow: 'Thông thoáng',
      crowdMed: 'Vừa phải',
      crowdHigh: 'Đông khách',
      waitPrefix: 'Chờ',
      warningBannerPrefix: 'Phản ánh gần đây',
      warningBannerDesc: 'Ban quản lý đang giám sát khắc phục khu vực sàn bếp giờ cao điểm.',
      currentCrowdLabel: 'Lượng khách tại quầy',
      peopleUnit: 'người',
      ingredientLogTitle: 'Nhật ký nguyên liệu hôm nay',
      batchesUnit: 'lô',
      inspectedAt: 'Kiểm định:',
      priceCommitLabel: 'Mức giá niêm yết',
      btnInspectLog: 'Hồ sơ vệ sinh',
      btnOrderNow: 'Đặt suất ăn',
    },
    order: {
      step1Title: 'Chọn quầy ăn',
      viewIngredientBtn: 'Xem nhật ký nguyên liệu',
      priorityWaitLabel: 'Làn ưu tiên',
      walkInWaitLabel: 'Xếp hàng thường',
      step2Title: 'Chọn hình thức bữa trưa',
      modeOmakase: 'Omakase (Bếp tự phối)',
      modeMenu: 'Chọn món theo thực đơn',
      omakaseBadge: 'Đầu bếp phối món theo khẩu vị',
      omakaseTitle: 'Omakase — Suất ăn nóng sốt phối theo ghi chú cá nhân',
      omakaseDesc:
        'Đầu bếp tự chọn 1 món đạm chính (tối thiểu 150g) kết hợp 2 món phụ và 1 canh nóng từ nguyên liệu tươi nhập trong sáng nay.',
      omakasePriceLabel: 'Giá lẻ niêm yết',
      orOneTicket: 'Hoặc 1 vé ăn định kỳ (25.000đ)',
      chefHintLabel: 'Thực đơn bếp chuẩn bị hôm nay: ',
      prefTitle: 'Tùy chọn khẩu vị & dị ứng cá nhân',
      previewOmakaseBtn: 'Xem gợi ý phối món mẫu',
      previewResultTitle: 'Gợi ý kết hợp hôm nay',
      mainDishLabel: 'Món chính',
      sideDishLabel: 'Món phụ',
      soupLabel: 'Canh',
      portionCommit: 'Định lượng:',
      customNoteLabel: 'Ghi chú gửi trực tiếp tới nhà bếp',
      customNotePlaceholder: 'Ví dụ: Không hành, lấy thêm nước sốt, đựng hộp 1 ngăn chịu nhiệt...',
      step3Badge: 'Nhận đồ không cần xếp hàng',
      step3Title: 'Chọn khung giờ nhận đồ (Làn ưu tiên & Tủ khóa giữ nhiệt)',
      slotsRemainingPrefix: 'Còn',
      slotsRemainingSuffix: 'chỗ',
      summaryTitle: 'Chi tiết đơn đặt trước',
      summaryHygienePrefix: 'Vệ sinh Hạng',
      summaryStallLabel: 'Quầy thực hiện',
      summaryCamNote: 'Có hỗ trợ xem trực tiếp camera khu chế biến',
      summaryMealLabel: 'Suất ăn đã chọn',
      summaryOmakaseName: 'Suất Omakase (Nhà bếp tự phối)',
      summaryPrefLabel: 'Khẩu vị:',
      summaryStandardPref: 'Tiêu chuẩn',
      summarySlotLabel: 'Khung giờ & Vị trí nhận đồ',
      summaryQrHint: 'Quét mã QR nhận ngay tại làn ưu tiên, không phải xếp hàng chờ.',
      paymentTitle: 'Phương thức thanh toán',
      payByTicketTitle: 'Sử dụng 1 vé ăn định kỳ',
      payByTicketDescPrefix: 'Còn',
      payByTicketDescSuffix: 'vé khả dụng • Tiết kiệm đến 30%',
      oneTicketBadge: '1 vé',
      payByWalletTitle: 'Thanh toán qua ví sinh viên',
      walletBalancePrefix: 'Số dư:',
      confirmOrderBtn: 'Xác nhận đặt suất ăn',
    },
    kitchen: {
      liveCamBadge: 'TRỰC TIẾP',
      tempLabel: 'Môi trường bếp:',
      aiCheckTitle: 'Giám sát quy chuẩn vệ sinh',
      aiCheckDesc: 'Đầy đủ khẩu trang, găng tay và trang phục bếp tiêu chuẩn',
      currentBatchLabel: 'Tiến độ khu vực nấu',
      viewLogBtn: 'Nhật ký nguyên liệu',
      trackingOrderPrefix: 'Mã đơn hàng',
      simulateNextBtn: 'Chuyển bước tiếp theo',
      steps: [
        {
          title: 'Tiếp nhận đơn & đồng bộ ghi chú xuống màn hình bếp',
        },
        {
          title: 'Kiểm định & cân đúng định lượng nguyên liệu',
          desc: 'Đảm bảo đủ tối thiểu 150g đạm, rau củ rửa sục ozone khử khuẩn',
        },
        {
          title: 'Đang chế biến nóng & đóng hộp giữ nhiệt',
          desc: 'Nấu mới theo mẻ, đóng vào hộp giữ nhiệt kháng khuẩn ở 65°C',
        },
        {
          title: 'Đã đặt sẵn tại Tủ khóa / Làn nhận đồ ưu tiên',
          descPrefix: 'Sẵn sàng nhận trong khung giờ',
          descSuffix: '— không cần xếp hàng',
        },
      ],
      lockerBadge: 'Vé nhận đồ ưu tiên / Tủ khóa',
      pickupTimeLabel: 'Khung giờ hẹn:',
      authCodeLabel: 'Mã nhận đồ:',
      scanQrText: 'MÃ NHẬN ĐỒ',
      selfZoneTitle: 'Khu vực tự túc: Đặt lịch lò vi sóng & bồn rửa hộp cơm',
      selfZoneSubtitle:
        'Dành cho sinh viên tự mang hộp cơm chuẩn bị sẵn từ nhà, chủ động hâm nóng và rửa dọn không phải chờ đợi:',
      currentSelfSlotPrefix: 'Lịch đã đặt:',
      bookSlotPrefix: 'Chọn',
    },
    mealpass: {
      badge: 'Tiết kiệm chi phí ăn trưa hàng tháng',
      title: 'Gói vé ăn định kỳ Tuần / Tháng — chỉ từ 25.000đ/bữa',
      subtitle:
        'Thay vì chi 35.000đ – 50.000đ mỗi ngày tại các quán ăn bên ngoài chưa rõ mức độ vệ sinh, gói vé định kỳ giúp cố định ngân sách hợp lý, chỉ áp dụng tại các bếp đạt chuẩn an toàn và luôn được nhận đồ tại làn ưu tiên.',
      currentTicketsLabel: 'Số vé hiện có',
      ticketsUnit: 'vé',
      retailPricePrefix: 'Giá mua lẻ:',
      perMealSuffix: '/ bữa',
      forMealsPrefix: 'gói',
      mealsUnit: 'suất',
      buyPlanBtnPrefix: 'Đăng ký gói (+',
      buyPlanBtnSuffix: ' vé)',
    },
    reviews: {
      badge: 'Đánh giá từ sinh viên đã sử dụng',
      formTitle: 'Gửi đánh giá hoặc phản ánh vệ sinh ẩn danh',
      formSubtitle:
        'Giúp cộng đồng sinh viên biết trước quán nào sạch sẽ, đúng định lượng và gửi cảnh báo trực tiếp tới Ban quản lý khi phát hiện vấn đề vệ sinh.',
      modeReview: 'Đánh giá bữa ăn',
      modeReport: 'Phản ánh vệ sinh',
      selectStallLabel: 'Chọn quầy ăn',
      scoreOverall: 'Tổng thể',
      scoreHygiene: 'Độ vệ sinh',
      scorePortion: 'Định lượng',
      starsUnit: 'sao',
      pointsUnit: '/5 điểm',
      fullPortionUnit: '/5 điểm',
      commentLabelNormal: 'Nhận xét thực tế (định lượng, hương vị, tốc độ nhận đồ)',
      commentLabelReport: 'Nội dung phản ánh vệ sinh (danh tính người gửi được ẩn hoàn toàn)',
      commentPlaceholderNormal: 'Ví dụ: Suất Omakase 30k đầy đặn, thịt tươi, nhận đồ ở tủ khóa rất nhanh...',
      commentPlaceholderReport: 'Ví dụ: Khu vực khay đựng muỗng đũa cần được lau khô thường xuyên hơn...',
      submitReviewBtn: 'Gửi đánh giá',
      submitReportBtn: 'Gửi phản ánh ẩn danh',
      feedTitle: 'Nhận xét từ sinh viên & Nhật ký giám sát vệ sinh',
      feedSubtitle: 'Chỉ hiển thị đánh giá từ các đơn hàng đã xác thực',
      verifiedBadge: 'Đã xác thực đơn hàng',
      hygieneScorePrefix: 'Vệ sinh:',
      managerReplyPrefix: 'Phản hồi từ Ban Quản Lý:',
    },
    modal: {
      badge: 'Hồ sơ an toàn thực phẩm & nguồn gốc nguyên liệu',
      inspectedByPrefix: 'Đơn vị kiểm tra:',
      ingredientTableTitle: 'Nhật ký nguyên liệu tươi sống nhập trong ngày',
      originPrefix: 'Nhà cung cấp:',
      importedAtPrefix: 'Giờ nhập:',
      quantityPrefix: 'Khối lượng:',
      storageTempPrefix: 'Nhiệt độ:',
      weeklyPhotoCaption: 'Hình ảnh thực tế khu vực chế biến kiểm tra định kỳ',
      criteriaTitle: 'Danh mục kiểm tra vệ sinh tại quầy',
      closeBtn: 'Đóng',
      orderThisStallBtn: 'Đặt suất ăn tại quầy này',
    },
    footer: {
      left: 'CamMeshi — Nền tảng đặt trước bữa trưa & minh bạch vệ sinh học đường',
      right: 'Đặt trước & Omakase • Camera bếp • Điểm vệ sinh A/B/C • Nhật ký nguyên liệu • Vé ăn định kỳ',
    },
    toasts: {
      noTickets: 'Bạn đã hết vé ăn định kỳ. Vui lòng đăng ký thêm gói vé hoặc chọn thanh toán qua ví.',
      lowWallet: 'Số dư ví sinh viên không đủ.',
      orderSuccess: 'Đặt suất ăn thành công. Đang chuyển tới màn hình theo dõi bếp.',
      planSuccessPrefix: 'Đăng ký thành công. Đã cộng thêm ',
      planSuccessSuffix: ' vé ăn vào tài khoản.',
      emptyReview: 'Vui lòng nhập nội dung nhận xét hoặc phản ánh.',
      reportSubmitted: 'Đã gửi phản ánh vệ sinh ẩn danh tới Ban quản lý.',
      reviewSubmitted: 'Đã đăng đánh giá của bạn.',
      crowdUpdated: 'Đã làm mới dữ liệu lượng khách tại các quầy.',
      stepUpdated: 'Đã cập nhật tiến độ chế biến đơn hàng.',
      selfSlotBookedPrefix: 'Đã đặt khung giờ sử dụng khu tự túc: ',
    },
  },
  jp: {
    tagline: '学内スマートランチ予約・食品衛生可視化システム',
    ticketLabel: '保有パス:',
    ticketUnit: '食分',
    walletLabel: '残高:',
    tabs: {
      explore: '店舗一覧・衛生評価',
      order: '事前予約・おまかせ',
      kitchen: '厨房カメラ・受取票',
      mealpass: '定額ミールパス',
      reviews: '口コミ・衛生報告',
    },
    hero: {
      badge: '毎朝05:30の食材検品・産地公開を実施',
      title: '出来立て・分量保証の清潔な昼食を 1食 25,000đ から',
      subtitle:
        'A/B/C衛生ランク、当日の食材トレーサビリティ、厨房ライブカメラを事前に確認可能。日替わりメニューやシェフのおまかせ予約で、ピーク時間帯でも優先レーン・保温ロッカーから並ばずに受け取れます。',
      ctaOrder: 'ランチを予約する',
      ctaPass: '定額ミールパスを見る',
      stat1Title: 'A / B / C 衛生ランク制度',
      stat1Desc: '毎朝の食材搬入記録と週次の厨房点検写真を公開',
      stat2Title: '優先レーン＆保温ロッカー',
      stat2Desc: 'QRコード提示で待ち時間15秒・ピーク時の行列を回避',
      stat3Title: 'お好み対応おまかせモード',
      stat3Desc: '苦手食材や栄養バランスに合わせてシェフがメニューを構成',
    },
    explore: {
      filterTitle: '絞り込み',
      filterAll: 'すべての店舗',
      filterGradeA: '衛生Aランクのみ',
      filterUnder30k: 'おまかせ 30,000đ以下',
      filterLowCrowd: '空いている店舗',
      refreshCrowd: '混雑状況を更新',
      hygieneBadgeTitle: '衛生評価',
      hygieneGradePrefix: 'ランク',
      watchCamBtn: '厨房カメラ',
      priorityLaneBadge: '優先受取:',
      minutesShort: '分',
      crowdLow: '空いています',
      crowdMed: 'やや混雑',
      crowdHigh: '混雑中',
      waitPrefix: '通常待ち',
      warningBannerPrefix: '最近の衛生改善報告',
      warningBannerDesc: '管理委員会の指導のもと、ピーク時の洗い場床面の乾燥対策を実施中です。',
      currentCrowdLabel: '現在のカウンター利用者数',
      peopleUnit: '名',
      ingredientLogTitle: '本日の食材トレーサビリティ記録',
      batchesUnit: '件',
      inspectedAt: '検品時刻:',
      priceCommitLabel: '価格帯',
      btnInspectLog: '衛生・食材記録',
      btnOrderNow: '注文へ進む',
    },
    order: {
      step1Title: '店舗を選択',
      viewIngredientBtn: '当日の食材記録を見る',
      priorityWaitLabel: '優先受取',
      walkInWaitLabel: '通常並び',
      step2Title: '注文方法を選択',
      modeOmakase: 'おまかせ（シェフ構成）',
      modeMenu: 'メニューから選択',
      omakaseBadge: '個別リクエスト対応',
      omakaseTitle: 'おまかせ注文 — お好みに合わせた出来立てバランス弁当',
      omakaseDesc:
        '当日の新鮮食材から、主菜1品（肉・魚150g以上）＋副菜2品＋温かいスープをシェフがバランス良く組み合わせて提供します。',
      omakasePriceLabel: '通常価格',
      orOneTicket: 'または定期パス1枚（25,000đ相当）',
      chefHintLabel: '本日の調理ラインナップ: ',
      prefTitle: 'お好み・アレルギー設定',
      previewOmakaseBtn: '本日の組み合わせ例を見る',
      previewResultTitle: '本日の構成イメージ',
      mainDishLabel: '主菜',
      sideDishLabel: '副菜',
      soupLabel: 'スープ',
      portionCommit: '規定分量:',
      customNoteLabel: '厨房へのリクエストメモ',
      customNotePlaceholder: '例：ネギ抜き、タレ少なめ、レンジ対応1段弁当箱を希望...',
      step3Badge: 'ピーク時の行列をスキップ',
      step3Title: '受取時間帯を選択（優先レーン・スマート保温ロッカー）',
      slotsRemainingPrefix: '残り',
      slotsRemainingSuffix: '枠',
      summaryTitle: '予約内容の確認',
      summaryHygienePrefix: '衛生ランク',
      summaryStallLabel: '選択店舗',
      summaryCamNote: '厨房ライブカメラで調理過程をリアルタイム確認可能',
      summaryMealLabel: '注文メニュー',
      summaryOmakaseName: 'シェフおまかせバランス弁当',
      summaryPrefLabel: '設定内容:',
      summaryStandardPref: '標準',
      summarySlotLabel: '受取時間・場所',
      summaryQrHint: '指定時間に優先レーンまたはQRロッカーから並ばずに受け取れます。',
      paymentTitle: 'お支払い方法',
      payByTicketTitle: '定期ミールパスを1枚使用',
      payByTicketDescPrefix: '現在',
      payByTicketDescSuffix: '枚保有 • 最大30%お得',
      oneTicketBadge: 'パス1枚',
      payByWalletTitle: '学生ウォレットで決済',
      walletBalancePrefix: '残高:',
      confirmOrderBtn: '予約を確定する',
    },
    kitchen: {
      liveCamBadge: 'LIVE配信',
      tempLabel: '厨房環境:',
      aiCheckTitle: '衛生管理モニタリング稼働中',
      aiCheckDesc: 'マスク・衛生手袋・調理帽の着用確認済み',
      currentBatchLabel: '現在の調理ロット',
      viewLogBtn: '食材記録を見る',
      trackingOrderPrefix: '注文番号',
      simulateNextBtn: '次のステップへ進める',
      steps: [
        {
          title: '注文受付および個別リクエストの厨房同期完了',
        },
        {
          title: '食材検品および規定分量（主菜150g以上）の計量',
          desc: 'オゾン洗浄済み野菜と当日朝納品の新鮮な肉・魚を使用',
        },
        {
          title: '加熱調理および保温容器への盛り付け中',
          desc: '出来立てを65°C保温・抗菌仕様の弁当容器に封入',
        },
        {
          title: '優先受取レーン／保温ロッカーへ格納完了',
          descPrefix: '受取枠',
          descSuffix: 'にて待ち時間なしでお受け取り可能',
        },
      ],
      lockerBadge: '優先受取パス／スマートロッカー',
      pickupTimeLabel: '受取時間:',
      authCodeLabel: '受取コード:',
      scanQrText: '受取用QR',
      selfZoneTitle: '自炊弁当エリア：電子レンジ・洗浄シンクの時間枠予約',
      selfZoneSubtitle:
        '自宅から持参した弁当箱を、ピーク時でも順番待ちなしで温め・洗浄できる専用清潔スペース：',
      currentSelfSlotPrefix: '現在の予約:',
      bookSlotPrefix: '選択:',
    },
    mealpass: {
      badge: '定額プランで食費を最適化',
      title: '定額ミールパス（週・月）— 衛生Aランクの昼食が 1食 25,000đ',
      subtitle:
        '衛生面や分量が不透明な周辺店舗で毎日35,000đ〜50,000đを支払う代わりに、定額ミールパスなら安全基準を満たした学食の温かい昼食を固定価格で計画的に確保できます。',
      currentTicketsLabel: '保有パス残数',
      ticketsUnit: '枚',
      retailPricePrefix: '通常合計:',
      perMealSuffix: '/ 1食',
      forMealsPrefix: '計',
      mealsUnit: '食分',
      buyPlanBtnPrefix: 'プランを申し込む (+',
      buyPlanBtnSuffix: ' 食分)',
    },
    reviews: {
      badge: '利用学生による評価とフィードバック',
      formTitle: 'レビュー投稿・匿名の衛生改善レポート',
      formSubtitle:
        '他の学生が安心してお店を選べるよう分量・味・衛生面の評価を共有したり、衛生上の問題点を匿名で管理委員会へ報告できます。',
      modeReview: '食事レビューを投稿',
      modeReport: '衛生問題を匿名報告',
      selectStallLabel: '対象店舗',
      scoreOverall: '総合評価',
      scoreHygiene: '衛生面',
      scorePortion: '分量',
      starsUnit: '点',
      pointsUnit: '/5',
      fullPortionUnit: '/5',
      commentLabelNormal: '利用した感想（分量、味、受け取りのスムーズさなど）',
      commentLabelReport: '改善してほしい衛生上の問題点（投稿者情報は匿名化されます）',
      commentPlaceholderNormal: '例：30,000đのおまかせ弁当でもお肉がしっかり入っており、ロッカー受取も快適でした。',
      commentPlaceholderReport: '例：ピーク時間帯にカトラリー周辺の清掃頻度を増やしてほしいです...',
      submitReviewBtn: 'レビューを投稿する',
      submitReportBtn: '匿名で報告を送信する',
      feedTitle: '学生の口コミおよび衛生モニタリング履歴',
      feedSubtitle: '実際に注文・受取を完了した学生のみが投稿可能',
      verifiedBadge: '注文認証済み',
      hygieneScorePrefix: '衛生:',
      managerReplyPrefix: '管理委員会からの回答:',
    },
    modal: {
      badge: '食品安全・食材トレーサビリティ記録',
      inspectedByPrefix: '監査担当:',
      ingredientTableTitle: '当日朝に納品された食材の産地・検品ログ',
      originPrefix: '供給元:',
      importedAtPrefix: '納品時刻:',
      quantityPrefix: '数量:',
      storageTempPrefix: '温度:',
      weeklyPhotoCaption: '定期点検時に撮影された厨房内の様子',
      criteriaTitle: '衛生管理チェックリスト',
      closeBtn: '閉じる',
      orderThisStallBtn: 'この店舗で予約する',
    },
    footer: {
      left: 'CamMeshi (キャンメシ) — スマート学食予約＆食品衛生可視化プラットフォーム',
      right: '事前予約・おまかせ • 厨房カメラ • A/B/C衛生ランク • 食材ログ • 定額ミールパス',
    },
    toasts: {
      noTickets: 'ミールパスの残数がありません。パスを追加購入するかウォレット決済を選択してください。',
      lowWallet: 'ウォレット残高が不足しています。',
      orderSuccess: '予約が確定しました。厨房モニタリング画面へ移動します。',
      planSuccessPrefix: 'プラン登録が完了しました（+',
      planSuccessSuffix: ' 食分追加）。',
      emptyReview: 'コメント内容を入力してください。',
      reportSubmitted: '匿名の衛生改善レポートを管理委員会へ送信しました。',
      reviewSubmitted: 'レビューを投稿しました。',
      crowdUpdated: '混雑状況データを更新しました。',
      stepUpdated: '調理ステータスを更新しました。',
      selfSlotBookedPrefix: '温め・洗浄スペースを予約しました: ',
    },
  },
};

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('unibite_lang') || 'vi');
  const t = UI_TEXT[lang];

  const [activeTab, setActiveTab] = useState('explore');

  // Shops & Filters
  const [shops, setShops] = useState(INITIAL_SHOPS);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedShopId, setSelectedShopId] = useState('shop-1');
  const [inspectModalShop, setInspectModalShop] = useState(null);

  // Ordering & Omakase State
  const [orderMode, setOrderMode] = useState('omakase');
  const [selectedMenuId, setSelectedMenuId] = useState('m-101');
  const [selectedPrefs, setSelectedPrefs] = useState(['no-onion', 'high-protein', 'reheat-box']);
  const [customNote, setCustomNote] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState('slot-2');
  const [paymentMethod, setPaymentMethod] = useState('ticket');
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

  // Active Order State
  const [orderState, setOrderState] = useState({
    id: 'ORD-8829',
    shopId: 'shop-1',
    slotTime: '11:15 – 11:30',
    lockerNumber: 'A08',
    qrCode: 'CAMMESHI-A08-8829',
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
    setTimeout(() => setToastMessage(null), 3500);
  };

  const selectedShop = shops.find((s) => s.id === selectedShopId) || shops[0];
  const selectedShopL = selectedShop[lang];
  const selectedSlot = PICKUP_SLOTS.find((s) => s.id === selectedSlotId) || PICKUP_SLOTS[0];
  const selectedSlotL = selectedSlot[lang];

  const filteredShops = shops.filter((shop) => {
    if (selectedFilter === 'gradeA') return shop.hygieneGrade === 'A';
    if (selectedFilter === 'under30k') return shop.omakasePrice <= 30000;
    if (selectedFilter === 'lowCrowd') return shop.crowdStatus !== 'high';
    return true;
  });

  const togglePref = (id) => {
    setSelectedPrefs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleGenerateOmakasePreview = () => {
    const combos =
      lang === 'vi'
        ? {
            mains: [
              'Ức gà áp chảo sốt Teriyaki (150g)',
              'Cá hồi phi lê sốt chanh dây (140g)',
              'Thịt bò xào bông cải xanh (145g)',
              'Sườn non nướng mật ong (155g)',
            ],
            sides: [
              'Trứng cuộn Tamagoyaki, đậu hũ non sốt nấm',
              'Salad bắp cải mè rang, kim chi cải thảo',
              'Rau củ luộc thập cẩm, trứng ngâm tương',
            ],
            soups: ['Canh rong biển thịt băm', 'Canh chua nấm kim châm', 'Canh cải ngọt nấu tôm'],
          }
        : {
            mains: [
              '照り焼きチキン胸肉ステーキ (150g)',
              'サーモンのパッションフルーツソース焼き (140g)',
              '牛肉とブロッコリーのオイスター炒め (145g)',
              'ハニーローストポークリブ (155g)',
            ],
            sides: [
              '厚焼き玉子・きのこあんかけ豆腐',
              '胡麻ドレッシングサラダ・白菜キムチ',
              '彩り温野菜・半熟味玉',
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
      qrCode: `CAMMESHI-${lockerNum}-${Math.floor(1000 + Math.random() * 9000)}`,
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

  const handleBuyMealPlan = (plan) => {
    setMealTickets((prev) => prev + plan.meals);
    showToast(`${t.toasts.planSuccessPrefix}${plan.meals}${t.toasts.planSuccessSuffix}`);
  };

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
          ? 'Sinh viên ẩn danh (Đã xác thực)'
          : 'Sinh viên (Đã xác thực đơn hàng)',
        verifiedOrder: isHygieneReport
          ? 'Phản ánh Vệ sinh An toàn Thực phẩm'
          : 'Đơn đặt trước qua UniBite',
        timeAgo: 'Vừa xong',
        comment: reviewText,
        tags: isHygieneReport
          ? ['Phản ánh vệ sinh', 'Đã gửi Ban quản lý']
          : ['Đúng định lượng', 'Đáng tiền'],
        managerReply: isHygieneReport
          ? 'Ban Quản Lý: Đã tiếp nhận phản ánh ẩn danh và chuyển bộ phận giám sát kiểm tra trực tiếp tại quầy.'
          : null,
      },
      jp: {
        shopName: targetShop.jp.name,
        studentName: isHygieneReport
          ? '匿名ユーザー（認証済み学生）'
          : '認証済み学生ユーザー',
        verifiedOrder: isHygieneReport
          ? '食品衛生フィードバック報告'
          : 'UniBite事前予約注文',
        timeAgo: 'たった今',
        comment: reviewText,
        tags: isHygieneReport
          ? ['衛生改善リクエスト', '管理委員会通知済み']
          : ['分量保証', '高コスパ'],
        managerReply: isHygieneReport
          ? '管理委員会より：匿名報告を受け付けました。担当チームが現地確認および改善指導を行います。'
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
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-950/80 text-emerald-200 border border-emerald-700/60 backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {t.explore.crowdLow} ({t.explore.waitPrefix} {waitMin} {t.explore.minutesShort})
        </span>
      );
    }
    if (status === 'medium') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-950/80 text-amber-200 border border-amber-700/60 backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          {t.explore.crowdMed} ({t.explore.waitPrefix} {waitMin} {t.explore.minutesShort})
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-950/80 text-rose-200 border border-rose-700/60 backdrop-blur-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
        {t.explore.crowdHigh} ({t.explore.waitPrefix} {waitMin} {t.explore.minutesShort})
      </span>
    );
  };

  const getHygieneBadge = (grade, score) => {
    const colors = {
      A: 'bg-emerald-700 text-white',
      B: 'bg-amber-600 text-white',
      C: 'bg-rose-700 text-white',
    };
    return (
      <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-lg shadow-xs border border-zinc-200">
        <div
          className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
            colors[grade] || colors.A
          }`}
        >
          {grade}
        </div>
        <div className="text-left leading-tight">
          <div className="text-[10px] text-zinc-500 font-medium">
            {t.explore.hygieneBadgeTitle}
          </div>
          <div className="text-xs font-bold text-zinc-900">{score}/100</div>
        </div>
      </div>
    );
  };

  const orderShop = shops.find((s) => s.id === orderState.shopId) || shops[0];
  const orderShopL = orderShop[lang];
  const orderItemName = orderState.isOmakase
    ? lang === 'vi'
      ? `Suất Omakase (${orderShopL.name})`
      : `おまかせバランス弁当 (${orderShopL.name})`
    : (orderShopL.menu.find((m) => m.id === orderState.menuId) || orderShopL.menu[0]).name;

  const orderPrefSummary = OMAKASE_PREFERENCES.filter((p) => orderState.prefs.includes(p.id))
    .map((p) => p[lang])
    .join(', ');

  const currentSelfZone = SELF_BRING_ZONES[bookedSelfSlotIndex.zoneIdx] || SELF_BRING_ZONES[0];
  const currentSelfSlotText = `${currentSelfZone[lang].name} — ${
    currentSelfZone[lang].slots[bookedSelfSlotIndex.slotIdx] || currentSelfZone[lang].slots[0]
  }`;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8f6] text-zinc-900">
      {/* Subtle Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md bg-zinc-900 text-white px-4 py-3 rounded-xl shadow-lg border border-zinc-700 flex items-center gap-2.5">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={2} />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Clean Brand Logo */}
          <div
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-800 flex items-center justify-center text-white font-extrabold text-sm tracking-tighter">
              CM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-zinc-900">CamMeshi</span>
                <span className="hidden sm:inline-block text-[11px] font-medium px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
                  {lang === 'vi' ? 'Campus Dining' : 'キャンメシ'}
                </span>
              </div>
              <p className="hidden md:block text-xs text-zinc-500">{t.tagline}</p>
            </div>
          </div>

          {/* Right Controls: Clean Language Switcher (VI | JP), Meal Pass & Wallet */}
          <div className="flex items-center gap-2.5">
            {/* Minimalist Segmented Language Switcher */}
            <div className="inline-flex items-center bg-zinc-100 p-0.5 rounded-lg border border-zinc-200">
              <button
                onClick={() => setLang('vi')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                  lang === 'vi'
                    ? 'bg-white text-zinc-900 shadow-2xs'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                Tiếng Việt
              </button>
              <button
                onClick={() => setLang('jp')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                  lang === 'jp'
                    ? 'bg-white text-zinc-900 shadow-2xs'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                日本語
              </button>
            </div>

            {/* Meal Pass Tickets Counter */}
            <button
              onClick={() => setActiveTab('mealpass')}
              className="flex items-center gap-2 bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200 px-3 py-1.5 rounded-lg cursor-pointer transition text-xs"
            >
              <Ticket className="w-3.5 h-3.5 text-emerald-700" strokeWidth={1.75} />
              <span className="text-zinc-600 hidden sm:inline">{t.ticketLabel}</span>
              <span className="font-bold text-emerald-800">
                {mealTickets} {t.ticketUnit}
              </span>
            </button>

            {/* Student Wallet */}
            <div className="hidden sm:flex items-center gap-1.5 bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-lg text-xs">
              <span className="text-zinc-500">{t.walletLabel}</span>
              <span className="font-semibold text-zinc-900 tabular-nums">
                {walletBalance.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>
        </div>

        {/* Clean Underline Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-zinc-100">
          <nav className="flex items-center gap-6 overflow-x-auto">
            {[
              { id: 'explore', label: t.tabs.explore },
              { id: 'order', label: t.tabs.order },
              { id: 'kitchen', label: t.tabs.kitchen, live: true },
              { id: 'mealpass', label: t.tabs.mealpass },
              { id: 'reviews', label: t.tabs.reviews },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-2 border-b-2 ${
                    isActive
                      ? 'border-emerald-700 text-emerald-800'
                      : 'border-transparent text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.live && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] rounded bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse-live" />
                      LIVE
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
        {/* Editorial Hero Section on Explore Tab */}
        {activeTab === 'explore' && (
          <section className="bg-zinc-900 text-white rounded-2xl p-6 sm:p-8 border border-zinc-800">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 text-xs font-medium border border-emerald-800/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {t.hero.badge}
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-snug">
                {t.hero.title}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('order')}
                  className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2"
                >
                  <span>{t.hero.ctaOrder}</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                </button>
                <button
                  onClick={() => setActiveTab('mealpass')}
                  className="px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium text-xs sm:text-sm border border-zinc-700 transition cursor-pointer"
                >
                  {t.hero.ctaPass}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-zinc-800">
              <div>
                <div className="text-xs font-semibold text-emerald-400">{t.hero.stat1Title}</div>
                <div className="text-xs text-zinc-400 mt-1">{t.hero.stat1Desc}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-emerald-400">{t.hero.stat2Title}</div>
                <div className="text-xs text-zinc-400 mt-1">{t.hero.stat2Desc}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-emerald-400">{t.hero.stat3Title}</div>
                <div className="text-xs text-zinc-400 mt-1">{t.hero.stat3Desc}</div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            TAB 1: KHÁM PHÁ QUẦY ĂN, TRẠNG THÁI QUÁN & ĐIỂM VỆ SINH A/B/C
        ===================================================================== */}
        {activeTab === 'explore' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-white rounded-xl p-3.5 border border-zinc-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center flex-wrap gap-1.5">
                <span className="text-xs font-medium text-zinc-500 mr-1.5">
                  {t.explore.filterTitle}:
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                      selectedFilter === f.id
                        ? 'bg-zinc-900 text-white'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleRefreshCrowd}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center gap-1.5 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.75} />
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
                    className="bg-white rounded-xl border border-zinc-200 hover:border-zinc-300 transition overflow-hidden flex flex-col"
                  >
                    {/* Top Image */}
                    <div className="relative h-44 bg-zinc-200">
                      <img
                        src={shop.image}
                        alt={shopL.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

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
                        className="absolute top-3 right-3 bg-zinc-900/80 hover:bg-zinc-900 text-white px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 backdrop-blur-xs border border-white/15 cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.75} />
                        {t.explore.watchCamBtn}
                      </button>

                      {/* Bottom overlay: Crowd Status */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                        {getCrowdBadge(shop.crowdStatus, shop.walkInWaitMinutes)}
                        <span className="text-[11px] font-semibold text-white bg-zinc-900/80 border border-white/15 px-2 py-1 rounded-md">
                          {t.explore.priorityLaneBadge} {shop.priorityWaitMinutes}{' '}
                          {t.explore.minutesShort}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[11px] font-medium text-emerald-700">
                              {shopL.category}
                            </span>
                            <h3 className="font-bold text-base text-zinc-900 leading-snug mt-0.5">
                              {shopL.name}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1 bg-zinc-100 px-2 py-1 rounded-md shrink-0">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            <span className="text-xs font-bold text-zinc-800">{shop.rating}</span>
                            <span className="text-[11px] text-zinc-500">({shop.reviewCount})</span>
                          </div>
                        </div>

                        {/* Warning Banner if reported */}
                        {shop.warningCount > 0 && (
                          <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200 flex items-start gap-2 text-xs text-amber-900">
                            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" strokeWidth={1.75} />
                            <div>
                              <span className="font-semibold">
                                {t.explore.warningBannerPrefix} ({shop.warningCount}):
                              </span>{' '}
                              {t.explore.warningBannerDesc}
                            </div>
                          </div>
                        )}

                        {/* Crowd Meter Bar */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-500">{t.explore.currentCrowdLabel}</span>
                            <span className="font-medium text-zinc-800 tabular-nums">
                              {shop.crowdCount}/{shop.maxCapacity} {t.explore.peopleUnit}
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                shop.crowdStatus === 'low'
                                  ? 'bg-emerald-600'
                                  : shop.crowdStatus === 'medium'
                                  ? 'bg-amber-500'
                                  : 'bg-rose-600'
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
                        <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/80 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-zinc-800">
                              {t.explore.ingredientLogTitle} ({shopL.ingredientLogs.length}{' '}
                              {t.explore.batchesUnit})
                            </span>
                            <span className="text-[11px] text-zinc-500">
                              {shopL.lastInspected}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-600 line-clamp-2">
                            {shopL.ingredientLogs
                              .map((i) => `${i.item} (${i.origin})`)
                              .join(' • ')}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-3 border-t border-zinc-100 space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-500">{t.explore.priceCommitLabel}</span>
                          <span className="font-bold text-zinc-900 tabular-nums">
                            {shopL.priceRange}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setInspectModalShop(shop)}
                            className="px-3 py-2 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition cursor-pointer"
                          >
                            {t.explore.btnInspectLog}
                          </button>
                          <button
                            onClick={() => {
                              setSelectedShopId(shop.id);
                              setSelectedMenuId(shopL.menu[0]?.id || 'm-101');
                              setActiveTab('order');
                            }}
                            className="px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white transition cursor-pointer"
                          >
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
              <div className="bg-white rounded-xl p-5 border border-zinc-200 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-zinc-900">
                    1. {t.order.step1Title}
                  </h2>
                  <button
                    onClick={() => setInspectModalShop(selectedShop)}
                    className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
                  >
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
                        className={`p-3.5 rounded-lg border cursor-pointer transition ${
                          active
                            ? 'border-emerald-700 bg-emerald-50/40'
                            : 'border-zinc-200 hover:border-zinc-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-900 text-white">
                            {t.explore.hygieneGradePrefix} {sh.hygieneGrade}
                          </span>
                          <span className="text-xs font-semibold text-emerald-800 tabular-nums">
                            Omakase {sh.omakasePrice.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                        <div className="font-bold text-xs text-zinc-900 line-clamp-1">
                          {shL.name}
                        </div>
                        <div className="text-[11px] text-zinc-500 mt-1">
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
              <div className="bg-white rounded-xl p-5 border border-zinc-200 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-sm sm:text-base font-bold text-zinc-900">
                    2. {t.order.step2Title}
                  </h2>

                  <div className="inline-flex rounded-lg p-1 bg-zinc-100 border border-zinc-200">
                    <button
                      onClick={() => setOrderMode('omakase')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                        orderMode === 'omakase'
                          ? 'bg-white text-zinc-900 shadow-2xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      {t.order.modeOmakase}
                    </button>
                    <button
                      onClick={() => setOrderMode('menu')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                        orderMode === 'menu'
                          ? 'bg-white text-zinc-900 shadow-2xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      {t.order.modeMenu}
                    </button>
                  </div>
                </div>

                {orderMode === 'omakase' ? (
                  <div className="space-y-4 bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200">
                      <div>
                        <span className="inline-block text-[11px] font-semibold text-emerald-700 mb-0.5">
                          {t.order.omakaseBadge}
                        </span>
                        <h3 className="font-bold text-zinc-900 text-sm sm:text-base">
                          {t.order.omakaseTitle}
                        </h3>
                        <p className="text-xs text-zinc-600 mt-0.5">{t.order.omakaseDesc}</p>
                      </div>
                      <div className="text-left sm:text-right shrink-0 bg-white px-3.5 py-2.5 rounded-lg border border-zinc-200">
                        <div className="text-[11px] text-zinc-500">
                          {t.order.omakasePriceLabel}
                        </div>
                        <div className="text-base font-bold text-zinc-900 tabular-nums">
                          {selectedShop.omakasePrice.toLocaleString('vi-VN')}đ
                        </div>
                        <div className="text-[11px] font-medium text-emerald-700">
                          {t.order.orOneTicket}
                        </div>
                      </div>
                    </div>

                    {/* Kitchen Hint */}
                    <div className="p-3 rounded-lg bg-white border border-zinc-200 text-xs text-zinc-700 leading-relaxed">
                      <span className="font-semibold text-zinc-900">{t.order.chefHintLabel}</span>
                      {selectedShopL.omakaseHint}
                    </div>

                    {/* Personal Preferences Chips (No emojis, clean checkmarks) */}
                    <div>
                      <label className="block text-xs font-semibold text-zinc-800 mb-2">
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
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer flex items-center gap-1.5 ${
                                isSelected
                                  ? 'bg-emerald-800 text-white border-emerald-800'
                                  : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
                              <span>{pref[lang]}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Preview Omakase Generator */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <button
                        type="button"
                        onClick={handleGenerateOmakasePreview}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-300 transition cursor-pointer"
                      >
                        {t.order.previewOmakaseBtn}
                      </button>

                      {omakasePreview && (
                        <div className="flex-1 bg-white p-3 rounded-lg border border-zinc-200 text-xs">
                          <div className="font-semibold text-zinc-900">
                            {t.order.previewResultTitle} ({omakasePreview.calories}):
                          </div>
                          <div className="text-zinc-600 mt-0.5">
                            <b>{t.order.mainDishLabel}:</b> {omakasePreview.main} •{' '}
                            <b>{t.order.sideDishLabel}:</b> {omakasePreview.side} •{' '}
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
                          className={`rounded-xl border overflow-hidden cursor-pointer transition flex flex-col ${
                            active
                              ? 'border-emerald-700 bg-emerald-50/30'
                              : 'border-zinc-200 bg-white hover:border-zinc-300'
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
                                <span className="text-xs font-bold text-zinc-900 tabular-nums">
                                  {item.price.toLocaleString('vi-VN')}đ
                                </span>
                                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600">
                                  {item.calories}
                                </span>
                              </div>
                              <h4 className="font-bold text-xs text-zinc-900 leading-snug">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-zinc-500 mt-1">
                                <b>{t.order.portionCommit}</b> {item.portion}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-1 pt-1">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-100 text-zinc-700"
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
                  <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                    {t.order.customNoteLabel}
                  </label>
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder={t.order.customNotePlaceholder}
                    className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 text-xs focus:outline-none focus:border-emerald-700 bg-white"
                  />
                </div>
              </div>

              {/* Step 3: Select Off-peak Pickup Time Slot */}
              <div className="bg-white rounded-xl p-5 border border-zinc-200 space-y-4">
                <div>
                  <span className="inline-block text-[11px] font-semibold text-emerald-700 mb-0.5">
                    {t.order.step3Badge}
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-zinc-900">
                    3. {t.order.step3Title}
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
                        className={`p-3.5 rounded-lg border cursor-pointer transition ${
                          active
                            ? 'border-emerald-700 bg-emerald-50/40'
                            : 'border-zinc-200 hover:border-zinc-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs sm:text-sm text-zinc-900 tabular-nums">
                            {slot.time}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                              slot.remaining <= 6
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-zinc-100 text-zinc-700'
                            }`}
                          >
                            {t.order.slotsRemainingPrefix} {slot.remaining}{' '}
                            {t.order.slotsRemainingSuffix}
                          </span>
                        </div>
                        <div className="text-xs font-medium text-zinc-800">{slotL.label}</div>
                        <div className="text-[11px] text-emerald-700 mt-1">{slotL.bonus}</div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">{slotL.lockerZone}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Order Summary & Checkout */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-xl p-5 border border-zinc-200 sticky top-24 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <h3 className="font-bold text-base text-zinc-900">{t.order.summaryTitle}</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-100 text-zinc-800">
                    {t.order.summaryHygienePrefix} {selectedShop.hygieneGrade}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/80 space-y-1">
                    <div className="text-zinc-500 text-[11px]">{t.order.summaryStallLabel}</div>
                    <div className="font-bold text-zinc-900 text-sm">{selectedShopL.name}</div>
                    <div className="text-zinc-600">{t.order.summaryCamNote}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200/80 space-y-1">
                    <div className="text-zinc-500 text-[11px]">{t.order.summaryMealLabel}</div>
                    <div className="font-bold text-zinc-900 text-sm">
                      {orderMode === 'omakase'
                        ? t.order.summaryOmakaseName
                        : selectedShopL.menu.find((m) => m.id === selectedMenuId)?.name}
                    </div>
                    {orderMode === 'omakase' && (
                      <div className="text-zinc-600 mt-1">
                        <b>{t.order.summaryPrefLabel}</b>{' '}
                        {OMAKASE_PREFERENCES.filter((p) => selectedPrefs.includes(p.id))
                          .map((p) => p[lang])
                          .join(', ') || t.order.summaryStandardPref}
                      </div>
                    )}
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 space-y-1">
                    <div className="text-emerald-800 font-semibold text-[11px]">
                      {t.order.summarySlotLabel}
                    </div>
                    <div className="font-bold text-zinc-900 text-sm">
                      {selectedSlot.time} ({selectedSlotL.label})
                    </div>
                    <div className="text-zinc-700">{selectedSlotL.lockerZone}</div>
                    <div className="text-[11px] text-zinc-500">{t.order.summaryQrHint}</div>
                  </div>

                  {/* Payment Selector */}
                  <div className="space-y-2 pt-2">
                    <div className="font-semibold text-zinc-800">{t.order.paymentTitle}</div>
                    <label
                      onClick={() => setPaymentMethod('ticket')}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition ${
                        paymentMethod === 'ticket'
                          ? 'border-emerald-700 bg-emerald-50/40'
                          : 'border-zinc-200'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-zinc-900">
                          {t.order.payByTicketTitle}
                        </div>
                        <div className="text-[11px] text-zinc-500">
                          {t.order.payByTicketDescPrefix} {mealTickets}{' '}
                          {t.order.payByTicketDescSuffix}
                        </div>
                      </div>
                      <span className="font-bold text-emerald-800 shrink-0">
                        {t.order.oneTicketBadge}
                      </span>
                    </label>

                    <label
                      onClick={() => setPaymentMethod('wallet')}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition ${
                        paymentMethod === 'wallet'
                          ? 'border-emerald-700 bg-emerald-50/40'
                          : 'border-zinc-200'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-zinc-900">
                          {t.order.payByWalletTitle}
                        </div>
                        <div className="text-[11px] text-zinc-500">
                          {t.order.walletBalancePrefix} {walletBalance.toLocaleString('vi-VN')}đ
                        </div>
                      </div>
                      <span className="font-bold text-zinc-900 shrink-0 tabular-nums">
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
                  className="w-full py-3 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition cursor-pointer"
                >
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
              <div className="lg:col-span-7 bg-zinc-900 text-white rounded-xl overflow-hidden border border-zinc-800 flex flex-col justify-between">
                {/* Camera Top Bar */}
                <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-600 text-white text-[11px] font-bold tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-live" />
                      {t.kitchen.liveCamBadge}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {selectedShop.cameraCode}
                    </span>
                  </div>

                  <select
                    value={selectedShopId}
                    onChange={(e) => setSelectedShopId(e.target.value)}
                    className="bg-zinc-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg border border-zinc-700"
                  >
                    {shops.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s[lang].name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Camera Visual Viewport */}
                <div className="relative h-80 sm:h-96 bg-black overflow-hidden">
                  <img
                    src={selectedShop.kitchenPhoto}
                    alt="Kitchen Camera Feed"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40" />

                  {/* Top HUD */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                    <div className="bg-zinc-950/80 backdrop-blur-xs px-3 py-1.5 rounded-md border border-white/10 text-zinc-200">
                      {t.kitchen.tempLabel} {selectedShopL.kitchenTemp}
                    </div>
                    <div className="bg-zinc-950/80 backdrop-blur-xs px-3 py-1.5 rounded-md border border-white/10 text-zinc-200 tabular-nums">
                      {liveTime}
                    </div>
                  </div>

                  {/* Hygiene Status Overlay */}
                  <div className="absolute top-16 left-3 sm:left-4 border border-emerald-500/60 bg-zinc-950/75 rounded-lg px-3 py-2 backdrop-blur-xs max-w-xs">
                    <div className="text-[11px] font-semibold text-emerald-400">
                      {t.kitchen.aiCheckTitle}
                    </div>
                    <div className="text-xs text-zinc-200 mt-0.5">
                      {selectedShopL.chefOnDuty} • {t.kitchen.aiCheckDesc}
                    </div>
                  </div>

                  {/* Bottom Live Batch Status */}
                  <div className="absolute bottom-3 left-3 right-3 bg-zinc-950/90 backdrop-blur-xs p-3.5 rounded-lg border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-[11px] text-zinc-400 font-medium">
                        {t.kitchen.currentBatchLabel}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                        {selectedShopL.currentCookingBatch}
                      </div>
                    </div>
                    <button
                      onClick={() => setInspectModalShop(selectedShop)}
                      className="px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium shrink-0 cursor-pointer border border-zinc-700"
                    >
                      {t.kitchen.viewLogBtn}
                    </button>
                  </div>
                </div>

                {/* Hygiene Checklist Footer */}
                <div className="p-4 bg-zinc-900 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-zinc-800">
                  {selectedShopL.hygieneChecklist.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs bg-zinc-800/60 px-3 py-2 rounded-md"
                    >
                      {item.passed ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" strokeWidth={2} />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" strokeWidth={2} />
                      )}
                      <span className="text-zinc-300">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 Columns: Real-Time Order Tracker & Fast-Lane QR Pickup */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-xl p-5 border border-zinc-200 space-y-5">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-3 gap-2">
                    <div>
                      <span className="text-[11px] font-semibold text-zinc-500">
                        {t.kitchen.trackingOrderPrefix} #{orderState.id}
                      </span>
                      <h3 className="font-bold text-base text-zinc-900">{orderItemName}</h3>
                    </div>
                    <button
                      onClick={() => {
                        setOrderState((prev) => ({ ...prev, step: (prev.step + 1) % 4 }));
                        showToast(t.toasts.stepUpdated);
                      }}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 cursor-pointer shrink-0"
                    >
                      {t.kitchen.simulateNextBtn}
                    </button>
                  </div>

                  {/* 4-Step Progress Bar */}
                  <div className="space-y-2.5">
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
                          className={`p-3 rounded-lg border flex items-start gap-3 transition ${
                            current
                              ? 'bg-emerald-50/50 border-emerald-600'
                              : done
                              ? 'bg-zinc-50 border-zinc-200'
                              : 'bg-white border-zinc-100 opacity-50'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 ${
                              done
                                ? 'bg-emerald-700 text-white'
                                : 'bg-zinc-200 text-zinc-600'
                            }`}
                          >
                            {done ? <Check className="w-3 h-3" strokeWidth={2.5} /> : st.step + 1}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-zinc-900">{st.title}</div>
                            <div className="text-[11px] text-zinc-500 mt-0.5">{st.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Priority QR Code Locker Box */}
                  <div className="p-4 rounded-xl bg-zinc-900 text-white flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                        {t.kitchen.lockerBadge}
                      </span>
                      <div className="text-sm font-bold">Locker #{orderState.lockerNumber}</div>
                      <div className="text-xs text-zinc-300">
                        {t.kitchen.pickupTimeLabel} <b>{orderState.slotTime}</b>
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono">
                        {t.kitchen.authCodeLabel} {orderState.qrCode}
                      </div>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg text-zinc-900 flex flex-col items-center shrink-0">
                      <QrCode className="w-12 h-12 text-zinc-900" strokeWidth={1.5} />
                      <span className="text-[9px] font-bold tracking-wider mt-1">
                        {t.kitchen.scanQrText}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Self-Bring Meal Prep & Microwave Booking */}
                <div className="bg-white rounded-xl p-5 border border-zinc-200 space-y-3">
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900">{t.kitchen.selfZoneTitle}</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">{t.kitchen.selfZoneSubtitle}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 font-medium">
                    {t.kitchen.currentSelfSlotPrefix} <b>{currentSelfSlotText}</b>
                  </div>

                  <div className="space-y-2">
                    {SELF_BRING_ZONES.map((z, zIdx) => {
                      const zL = z[lang];
                      return (
                        <div
                          key={z.id}
                          className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 text-xs space-y-2"
                        >
                          <div className="font-semibold text-zinc-800">{zL.name}</div>
                          <div className="text-[11px] text-zinc-500">{zL.equipment}</div>
                          <div className="flex flex-wrap gap-1.5">
                            {zL.slots.map((sl, sIdx) => (
                              <button
                                key={sl}
                                onClick={() => {
                                  setBookedSelfSlotIndex({ zoneIdx: zIdx, slotIdx: sIdx });
                                  showToast(`${t.toasts.selfSlotBookedPrefix}${sl}`);
                                }}
                                className="px-2.5 py-1 rounded bg-white hover:bg-zinc-900 hover:text-white border border-zinc-200 text-[11px] font-medium transition cursor-pointer"
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
            <div className="bg-white rounded-xl p-6 border border-zinc-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-emerald-700">
                  {t.mealpass.badge}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900">{t.mealpass.title}</h2>
                <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl">
                  {t.mealpass.subtitle}
                </p>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 px-5 py-3.5 rounded-xl text-right shrink-0">
                <div className="text-xs text-zinc-500">{t.mealpass.currentTicketsLabel}</div>
                <div className="text-2xl font-bold text-emerald-800 tabular-nums">
                  {mealTickets} {t.mealpass.ticketsUnit}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MEAL_PLANS.map((plan) => {
                const planL = plan[lang];
                return (
                  <div
                    key={plan.id}
                    className="bg-white rounded-xl p-6 border border-zinc-200 flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {planL.badge}
                        </span>
                        <span className="text-xs text-zinc-400 line-through tabular-nums">
                          {t.mealpass.retailPricePrefix}{' '}
                          {plan.originalPrice.toLocaleString('vi-VN')}đ
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-zinc-900">{planL.name}</h3>

                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-bold text-zinc-900 tabular-nums">
                          {plan.pricePerMeal.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="text-xs text-zinc-500">
                          {t.mealpass.perMealSuffix} ({plan.price.toLocaleString('vi-VN')}đ /{' '}
                          {t.mealpass.forMealsPrefix} {plan.meals} {t.mealpass.mealsUnit})
                        </span>
                      </div>

                      <ul className="space-y-2 pt-2 border-t border-zinc-100">
                        {planL.perks.map((perk, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-zinc-600">
                            <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" strokeWidth={2} />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleBuyMealPlan(plan)}
                      className="w-full py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
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
            {/* Left 5 Columns */}
            <div className="lg:col-span-5">
              <form
                onSubmit={handleSubmitReview}
                className="bg-white rounded-xl p-5 border border-zinc-200 space-y-4 sticky top-24"
              >
                <div>
                  <span className="text-[11px] font-semibold text-emerald-700">
                    {t.reviews.badge}
                  </span>
                  <h3 className="text-base font-bold text-zinc-900 mt-0.5">
                    {t.reviews.formTitle}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{t.reviews.formSubtitle}</p>
                </div>

                {/* Mode Switch */}
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-100 rounded-lg border border-zinc-200">
                  <button
                    type="button"
                    onClick={() => setIsHygieneReport(false)}
                    className={`py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                      !isHygieneReport
                        ? 'bg-white text-zinc-900 shadow-2xs'
                        : 'text-zinc-600'
                    }`}
                  >
                    {t.reviews.modeReview}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsHygieneReport(true)}
                    className={`py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                      isHygieneReport
                        ? 'bg-rose-700 text-white shadow-2xs'
                        : 'text-zinc-600'
                    }`}
                  >
                    {t.reviews.modeReport}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    {t.reviews.selectStallLabel}
                  </label>
                  <select
                    value={reviewShopId}
                    onChange={(e) => setReviewShopId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-xs font-medium bg-white"
                  >
                    {shops.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s[lang].name} ({t.explore.hygieneGradePrefix} {s.hygieneGrade})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-center">
                    <div className="text-[11px] text-zinc-500">{t.reviews.scoreOverall}</div>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="mt-1 font-semibold text-xs bg-white border border-zinc-200 rounded px-2 py-1"
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {n} {t.reviews.starsUnit}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-center">
                    <div className="text-[11px] text-zinc-500">{t.reviews.scoreHygiene}</div>
                    <select
                      value={reviewHygiene}
                      onChange={(e) => setReviewHygiene(Number(e.target.value))}
                      className="mt-1 font-semibold text-xs bg-white border border-zinc-200 rounded px-2 py-1"
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {n}
                          {t.reviews.pointsUnit}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-center">
                    <div className="text-[11px] text-zinc-500">{t.reviews.scorePortion}</div>
                    <select
                      value={reviewPortion}
                      onChange={(e) => setReviewPortion(Number(e.target.value))}
                      className="mt-1 font-semibold text-xs bg-white border border-zinc-200 rounded px-2 py-1"
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
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
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
                    className="w-full p-3 rounded-lg border border-zinc-300 text-xs focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-2.5 rounded-lg font-semibold text-xs text-white transition cursor-pointer ${
                    isHygieneReport
                      ? 'bg-rose-700 hover:bg-rose-800'
                      : 'bg-emerald-700 hover:bg-emerald-800'
                  }`}
                >
                  {isHygieneReport ? t.reviews.submitReportBtn : t.reviews.submitReviewBtn}
                </button>
              </form>
            </div>

            {/* Right 7 Columns: Verified Student Reviews Feed */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-xl p-4 border border-zinc-200 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-bold text-sm text-zinc-900">
                    {t.reviews.feedTitle} ({reviews.length})
                  </h3>
                  <p className="text-xs text-zinc-500">{t.reviews.feedSubtitle}</p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200">
                  {t.reviews.verifiedBadge}
                </span>
              </div>

              {reviews.map((rev) => {
                const revL = rev[lang];
                return (
                  <div
                    key={rev.id}
                    className={`bg-white rounded-xl p-5 border space-y-3 ${
                      rev.isWarning ? 'border-amber-300 bg-amber-50/20' : 'border-zinc-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-zinc-900">
                            {revL.studentName}
                          </span>
                          <span className="text-[11px] text-zinc-400">• {revL.timeAgo}</span>
                        </div>
                        <div className="text-xs text-zinc-600 mt-0.5">
                          <span className="font-medium text-emerald-800">{revL.shopName}</span> —{' '}
                          <span>{revL.verifiedOrder}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800">
                          {rev.rating}/5
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
                          {t.reviews.hygieneScorePrefix} {rev.hygieneRating}/5
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                      {revL.comment}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {revL.tags.map((tag, i) => (
                        <span
                          key={i}
                          className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                            rev.isWarning
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-zinc-100 text-zinc-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {revL.managerReply && (
                      <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-700">
                        <b>{t.reviews.managerReplyPrefix}</b> {revL.managerReply}
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-zinc-200 space-y-5 my-8">
            <div className="flex items-start justify-between gap-4 border-b border-zinc-100 pb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-700">{t.modal.badge}</span>
                <h3 className="text-lg font-bold text-zinc-900 mt-0.5">
                  {inspectModalShop[lang].name}
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {t.modal.inspectedByPrefix} {inspectModalShop[lang].inspectorTeam} (
                  {inspectModalShop[lang].lastInspected})
                </p>
              </div>
              <button
                onClick={() => setInspectModalShop(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Daily Ingredient Origin Table */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-zinc-800">{t.modal.ingredientTableTitle}</h4>
              <div className="space-y-2">
                {inspectModalShop[lang].ingredientLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-zinc-900">{log.item}</div>
                      <div className="text-zinc-500">
                        {t.modal.originPrefix} {log.origin}
                      </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <div className="font-semibold text-emerald-700">{log.status}</div>
                      <div className="text-[11px] text-zinc-500 tabular-nums">
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
              <div className="rounded-lg overflow-hidden border border-zinc-200">
                <img
                  src={inspectModalShop.kitchenPhoto}
                  alt="Kitchen Inspection"
                  className="w-full h-40 object-cover"
                />
                <div className="p-2 bg-zinc-50 text-[11px] text-zinc-600 text-center border-t border-zinc-200">
                  {t.modal.weeklyPhotoCaption}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold text-zinc-800">{t.modal.criteriaTitle}</div>
                {inspectModalShop[lang].hygieneChecklist.map((chk, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-600">
                    {chk.passed ? (
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" strokeWidth={2} />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" strokeWidth={2} />
                    )}
                    <span>{chk.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100">
              <button
                onClick={() => setInspectModalShop(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-700 cursor-pointer"
              >
                {t.modal.closeBtn}
              </button>
              <button
                onClick={() => {
                  setSelectedShopId(inspectModalShop.id);
                  setInspectModalShop(null);
                  setActiveTab('order');
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer"
              >
                {t.modal.orderThisStallBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-5 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500">
          <div className="font-medium text-zinc-700">{t.footer.left}</div>
          <div>{t.footer.right}</div>
        </div>
      </footer>
    </div>
  );
}
