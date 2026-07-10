import { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DEMNATE_CENTER: [number, number] = [31.7314, -7.0022];
const IMI_N_IFRI: [number, number] = [31.7235755, -6.9714773];
const OUZOUD_FALLS: [number, number] = [32.0152, -6.7189];

type TabKey = 'intro' | 'history' | 'urban' | 'landmarks' | 'heritage' | 'nature' | 'society';

function createPinIcon(color: string) {
  return L.divIcon({
    className: 'custom-pin',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-md">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3" fill="white" stroke="none"></circle>
    </svg>`,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
  });
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 text-2xl font-bold text-emerald-800 md:text-3xl">{children}</h2>;
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-2 mt-6 text-xl font-bold text-slate-900">{children}</h3>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 leading-loose text-slate-700">{children}</p>;
}

function Card({ title, children, image }: { title: string; children: React.ReactNode; image?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      {image && (
        <div className="h-48 w-full overflow-hidden">
          <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
        </div>
      )}
      <div className="p-5">
        <h4 className="mb-2 text-lg font-bold text-emerald-800">{title}</h4>
        <div className="text-slate-700">{children}</div>
      </div>
    </div>
  );
}

function TimelineItem({ year, title, children }: { year: string; title: string; children: React.ReactNode }) {
  return (
    <div className="relative border-r-2 border-emerald-200 pr-6 pb-8 last:pb-0">
      <span className="absolute -right-[9px] top-0 h-4 w-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
      <span className="mb-1 block text-sm font-bold text-emerald-700">{year}</span>
      <h4 className="mb-2 text-lg font-bold text-slate-900">{title}</h4>
      <div className="text-slate-700">{children}</div>
    </div>
  );
}

const TABS: { key: TabKey; label: string }[] = [
  { key: 'intro', label: 'مقدمة' },
  { key: 'history', label: 'التاريخ' },
  { key: 'urban', label: 'البنية العمرانية' },
  { key: 'landmarks', label: 'المعالم' },
  { key: 'heritage', label: 'التراث المادي واللامادي' },
  { key: 'nature', label: 'الطبيعة والبيئة' },
  { key: 'society', label: 'المجتمع والاقتصاد' },
];

function IntroTab() {
  return (
    <div className="space-y-6">
      <SectionTitle>مدينة دمنات: بوابة الأطلس ومدينة الألف باب</SectionTitle>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Paragraph>
            <strong>دمنات</strong> (بالأمازيغية: ⴷⵎⵏⴰⵜ) مدينة مغربية تاريخية تقع على السفح الشمالي للأطلس الكبير الأوسط،
            ضمن إقليم أزيلال بجهة بني ملال - خنيفرة. وتبعد نحو 105 كيلومترات شرق مراكش، وترتفع بحوالي 920 إلى 970 متراً
            فوق سطح البحر، مما يمنحها مناخاً قارياً بارد الشتاء وحار الصيف.
          </Paragraph>
          <Paragraph>
            يُعتقد أن معنى اسم "دمنات" في الذاكرة الأمازيغية يشير إلى "الأرض الخصبة"، وهو ما يتجلى في لونها الأخضر
            المميز الذي أطلق عليه الفنانون التشكيليون اسم "الأخضر الدمناتي"، نتيجة توسط المدينة بسهل خصيب محاط
            ببساتين الزيتون واللوز والشعير.
          </Paragraph>
          <Paragraph>
            تُعدّ دمنات من أقدم المراكز الحضرية بالجنوب المغربي، وكانت محطة تجارية ودينية مهمة تربط سهل الحوز بمراكش،
            وبقبائل الأطلس والصحراء جنوباً. ولا تزال المدينة تحتفظ بجوّها التقليدي، وبقايا أسوارها وقصبتها
            وملاحها اليهودي القديم، رغم التحديات التي تواجه تراثها المعماري.
          </Paragraph>
        </div>
        <div className="space-y-4">
          <img
            src="/images/demnate-kasbah.jpg"
            alt="أسوار وقصبة دمنات"
            className="w-full rounded-2xl shadow-lg"
          />
          <div className="grid grid-cols-2 gap-3">
            <Fact label="المنطقة" value="بني ملال - خنيفرة" />
            <Fact label="الإقليم" value="أزيلال" />
            <Fact label="عدد السكان (2024)" value="33,635 نسمة" />
            <Fact label="الارتفاع" value="حوالي 920 - 970 م" />
            <Fact label="المحور اللغوي" value="تاشلحيت - الدارجة - الفرنسية" />
            <Fact label="المسافة من مراكش" value="نحو 105 كم شرقاً" />
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryTab() {
  return (
    <div className="space-y-6">
      <SectionTitle>تاريخ دمنات: من النواة الأولى إلى المدينة المحصّنة</SectionTitle>
      <Paragraph>
        تتقاطع الروايات التاريخية حول نشأة دمنات، لكنها تتفق على أنها من أقدم المدن المغربية، وأن النواة الحضرية
        الأولى ظهرت قبل الإسلام في موضع يُعرف بـ"ألمدين"، قبل أن تنتقل المدينة إلى موقعها الحالي.
      </Paragraph>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TimelineItem year="ما قبل الإسلام" title="نواة ألمدين">
            <Paragraph>
              تشير بعض الدراسات إلى وجود تجمع بشري قديم في موقع "ألمدين"، شكّل اللبنة الأولى لمدينة دمنات،
              قبل أن تتطور العمارة وتنتقل المدينة إلى موقعها الحالي عند سفح الأطلس.
            </Paragraph>
          </TimelineItem>
          <TimelineItem year="القرن 8 م" title="رواية موسى بن نصير">
            <Paragraph>
              ذكر بعض المؤرخين المحليين أن الوالي الأموي موسى بن نصير هو من بنى دمنات، غير أن المؤرخ أحمد التوفيق
              يرجح أن المدينة نمت من قرية صغيرة قبل أن يُشيّد فيها الموحدون قصبتهم.
            </Paragraph>
          </TimelineItem>
          <TimelineItem year="القرن 12 م" title="العهد الموحدي والقصبة">
            <Paragraph>
              يرجّح أحمد التوفيق بناء قصبة دمنات إلى العهد الموحدي، كما يؤكد اليهود الدمناتيون تأسيس ملاحهم
              في عهد أبي يعقوب يوسف الموحدي، أي قبل ملاح مراكش بنحو أربعمائة سنة.
            </Paragraph>
          </TimelineItem>
          <TimelineItem year="القرن 17 - 18 م" title="عصر العلويين: قصر المولى هشام">
            <Paragraph>
              شيّد المولى هشام، أحد أبناء السلطان المولى إسماعيل، قصره المسمى "دار مولاي هشام" ليضمن استقرار
              المدينة، كما أعاد بناء وتقوية سور دمنات.
            </Paragraph>
          </TimelineItem>
          <TimelineItem year="1887" title="الظهير السلطاني للحسن الأول">
            <Paragraph>
              أصدر السلطان مولاي الحسن الأول ظهيراً يرفع بموجبه دمنات إلى مصاف المدن الحضرية، كما أمر ببناء ملاح
              جديد لليهود بعد نزاع حول تلوث مياه الساقية.
            </Paragraph>
          </TimelineItem>
          <TimelineItem year="1942" title="تصنيف السور كتراث وطني">
            <Paragraph>
              صُنّف سور دمنات كتراث وطني بقرار وزيري، نظراً لقيمته المعمارية والتاريخية، رغم أن أجزاءً منه
              تعرضت للاندثار والتخريب في العقود الأخيرة.
            </Paragraph>
          </TimelineItem>
        </div>
        <div className="space-y-4">
          <img src="/images/demnate-kasbah.jpg" alt="تاريخ دمنات" className="rounded-2xl shadow-lg" />
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h4 className="mb-2 font-bold text-amber-900">دمنات ومراكش</h4>
            <p className="text-amber-900">
              يشيع بين أبناء المدينة القول إن دمنات "سبقت مراكش بأربعين سنة"، وهو ما يؤكده بعض الباحثين
              الذين يرون أن نواة ألمدين سابقة على تأسيس مراكش، مما يجعل دمنات شاهدة على أقدم مراحل التمدن
              بالجنوب المغربي.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UrbanTab() {
  return (
    <div className="space-y-6">
      <SectionTitle>البنية العمرانية والتنظيم الحضري</SectionTitle>
      <Paragraph>
        اتبعت دمنات النموذج الكلاسيكي للمدن العتيقة المغربية: مدينة محصّنة بسور من الطين المدكوك (التابية)،
        تتوسطها القصبة المخزنية، وتتفرع منها أحياء سكنية ضيقة، وأسواق، وفنادق للتجار، وحمامات، ومساجد، وزوايا.
      </Paragraph>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card title="السور والأبواب" image="/images/demnate-kasbah.jpg">
          <p className="leading-relaxed">
            كان سور دمنات يحيط بالمدينة العتيقة ويتخلله أبراج دفاعية وأبواب خشبية مزخرفة. ومن أشهر أبوابه
            المذكورة في الذاكرة المحلية: <strong>باب إغرابن</strong> المفتوح على الشمال الشرقي لاستقبال القوافل القادمة من
            مراكش والسراغنة، و<strong>باب العيد</strong> المؤدي إلى الجبال، و<strong>باب أكداين</strong> المطل على البساتين،
            و<strong>باب الملاح</strong> الذي فُتح لاحقاً بعد بناء حي يهودي جديد.
          </p>
        </Card>
        <Card title="القصبة المخزنية">
          <p className="leading-relaxed">
            القصبة هي أول ما بُني في دمنات، وكانت مقر الحامية والإدارة، ويحيط بها سور خاص. ولا تزال أطلالها
            تشهد على عظمة المدينة الحربية والإدارية في الماضي.
          </p>
        </Card>
        <Card title="الملاح اليهودي">
          <p className="leading-relaxed">
            يُعتبر ملاح دمنات من أقدم الأحياء اليهودية بالمغرب، أسس في العهد الموحدي. وكان اليهود يمارسون
            التجارة والصناعة، خاصة النبيذ والجلود، حتى هجرتهم الجماعية في منتصف القرن العشرين.
          </p>
        </Card>
        <Card title="الأحياء السكنية">
          <p className="leading-relaxed">
            تنقسم المدينة العتيقة إلى أحياء مثل <strong>حي أرحبي</strong>، وتتكون من دُرَب ضيقة تفضي إلى منازل
            ذات باحات داخلية، تتميز بواجهات مغلقة ونوافذ صغيرة تحفظ خصوصية الأسرة.
          </p>
        </Card>
        <Card title="الأسواق والفنادق">
          <p className="leading-relaxed">
            كانت دمنات تضم أسواقاً عتيقة وفنادق (خانات) لإيواء التجار القادمين من قبائل الأطلس والصحراء.
            ومن أشهرها السوق الأسبوعي الذي يُقام كل خميس، بالإضافة إلى أسواق متخصصة للجلود والخزف والحدادة.
          </p>
        </Card>
        <Card title="الماء والسّواقي">
          <p className="leading-relaxed">
            تزود دمنات بمياه عيون محلية مثل عين سدي وكريان وعين محاصر، وبواسطة ساقيتي <strong>أيت يحيا</strong>
            و<strong>تودنوست</strong>، اللتين كانتا محور نزاعات قبلية وقيم اجتماعية وثقافية عميقة.
          </p>
        </Card>
      </div>

      <SubTitle>الطراز المعماري</SubTitle>
      <Paragraph>
        يتجلى التراث المعماري الدمناتي في استخدام الطين المدكوك والطوب اللبن، مع أسقف من الخشب والقصب،
        وأبواب خشبية منقوشة، وزخارف جصية، وزليج ملون في بعض المساجد والزوايا. ويظهر التأثير الأمازيغي
        بوضوح في أشكال الأبواب الصغيرة وفي ترتيب الغرف حول الباحة المركزية.
      </Paragraph>
    </div>
  );
}

function LandmarksTab() {
  return (
    <div className="space-y-6">
      <SectionTitle>المعالم التاريخية والطبيعية</SectionTitle>
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="قصبة دمنات وسورها" image="/images/demnate-kasbah.jpg">
          <p className="leading-relaxed">
            رمز المدينة وشاهد على عبقها التاريخي. القصبة المخزنية محاطة بسور من الطين المدكوك صُنف كتراث وطني
            سنة 1942. رغم الاهتراء، لا تزال أبوابه وأبراجه تحمل ذاكرة المدينة العسكرية والتجارية.
          </p>
        </Card>
        <Card title="دار مولاي هشام">
          <p className="leading-relaxed">
            قصر أثري شيّده المولى هشام في القرن الثامن عشر على هامش المدينة، ليؤمن استقرارها. يعكس القصر
            الطراز المعماري العلوي التقليدي، ويتكون من بهو وحدائق وغرف مزخرفة.
          </p>
        </Card>
        <Card title="قصر الكلاوي">
          <p className="leading-relaxed">
            أحد القصور التاريخية داخل الرياض (الحديقة المحصنة) التي تحيط بها الأشجار المثمرة. يتخلل سوره
            أبراج دفاعية كانت تُستخدم للمراقبة والطوارئ.
          </p>
        </Card>
        <Card title="الملاح اليهودي">
          <p className="leading-relaxed">
            حي تاريخي كان يسكنه اليهود منذ العهد الموحدي. ولا تزال بقايا دوره وكنيسه ومقبرته تشهد على حقبة
            من التعايش والتبادل الثقافي بين المسلمين واليهود بدمنات.
          </p>
        </Card>
        <Card title="المساجد والزوايا">
          <p className="leading-relaxed">
            تزخر المدينة بمساجد قديمة وزوايا صوفية، منها الزاوية الدلائية والتجانية والكتانية والقادرية،
            إضافة إلى أضرحة أولياء مثل سيدي حداني وسيدي ناصر علي وسيدي محمد أسعيد وسيدي أبو البخت.
          </p>
        </Card>
        <Card title="الحمامات التقليدية">
          <p className="leading-relaxed">
            كانت الحمامات العمومية جزءاً أساسياً من الحياة الاجتماعية، تتغذى من مياه الساقية والعيون الحارة،
            وتشكل مكاناً للقاء والتبادل اليومي.
          </p>
        </Card>
        <Card title="جسر إمي نيفري الطبيعي" image="/images/imi-n-ifri.jpg">
          <p className="leading-relaxed">
            يقع على بعد نحو 6 كم جنوب دمنات، وهو قوس صخري طبيعي يعلو واد محاصر. يعني اسمه الأمازيغي
            "باب الهوّة"، ويضم أكثر من عشرين عيناً مائية ومغارات وآثاراً جيولوجية فريدة.
          </p>
        </Card>
        <Card title="شلالات أوزود" image="/images/ouzoud-falls.jpg">
          <p className="leading-relaxed">
            أعلى شلالات المغرب (110 أمتار)، تقع على بعد نحو 70 كم شمال شرق دمنات. تتدفق مياهها بين الصخور
            الحمراء والأشجار الخضراء، وتشكل منطقة جذب سياحي وطبيعياً بارزة.
          </p>
        </Card>
      </div>
    </div>
  );
}

function HeritageTab() {
  return (
    <div className="space-y-6">
      <SectionTitle>التراث المادي واللامادي</SectionTitle>

      <SubTitle>التراث المادي والحرف اليدوية</SubTitle>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Paragraph>
            عاشت دمنات ازدهاراً كبيراً في الحرف التقليدية، وكانت مدرسة لتكوين الصناع في مجالات الخزف والجلد
            والنسيج، استقطبتهم المدن الكبرى مثل مراكش وفاس وسلا. ومن أبرز الحرف:
          </Paragraph>
          <ul className="list-inside list-disc space-y-2 text-slate-700">
            <li>
              <strong>الخزف والفخار:</strong> اشتهرت دمنات بالبلغة الدمناتية وأواني الطهي الطينية، وما زالت قرية
              بوغرارت قرب المدينة تشتهر بهذه الصناعة.
            </li>
            <li>
              <strong>الجلود والدباغة:</strong> كانت المدينة مركزاً لمعالجة جلد الماعز وصناعة الأحذية والسرج
              المطرزة.
            </li>
            <li>
              <strong>النسيج:</strong> حياكة الصوف والألبسة الصوفية والزرابي والأغطية التقليدية.
            </li>
            <li>
              <strong>الحدادة والنجارة:</strong> صناعة الأبواب الخشبية المزخرفة والأدوات المعدنية.
            </li>
            <li>
              <strong>اللباس التقليدي:</strong> الجلباب والحايك والتكشيطة، والحلي الفضية في الزوايا والأعراس.
            </li>
          </ul>
        </div>
        <div>
          <img src="/images/demnate-pottery.jpg" alt="حرف دمنات التقليدية" className="rounded-2xl shadow-lg" />
        </div>
      </div>

      <SubTitle>المأكولات الدمناتية</SubTitle>
      <Paragraph>
        تشتهر دمنات بطبق <strong>الطنجية الدمناتية</strong>، إضافة إلى الكسكس باللحم والخضر، والهربل،
        والعصيدة، والضلعة المشوية، والطاجين المخزني. كما تتميز بمنتجات زيت الزيتون البكر، والعسل البلدي،
        والزبدة، واللوز والجوز، والبصل والكرعة البلدية، والفصة الدمناتية المستخدمة في تربية الماشية.
      </Paragraph>

      <SubTitle>التراث اللامادي</SubTitle>
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="اللغة والفلكلور">
          <p className="leading-relaxed">
            اللغة الأمازيغية (تاشلحيت) هي لغة التواصل اليومي، وتحتفظ المنطقة بتراث شعري وفلكلوري غني،
            من الأهازيج والأغاني الشعبية التي ترافق الأعراس والمواسم.
          </p>
        </Card>
        <Card title="الموسيقى الصوفية والرقص">
          <p className="leading-relaxed">
            تزخر دمنات بفرق <strong>الدقة الدمناتية</strong> و<strong>أحواش</strong> و<strong>عيساوة</strong>
            و<strong>حمادشة</strong> و<strong>الطبيضة</strong> النسائية، التي تُحيي الأعراس والمواسم بإيقاعات روحانية.
          </p>
        </Card>
        <Card title="المواسم والأعياد">
          <p className="leading-relaxed">
            من أشهرها موسم <strong>سدي وكريان</strong>، وموسم ساقية أيت يحيا، ومهرجان اللوز، وموسم عيساوة
            وحمادشة، التي تُقام عادة في الصيف وتجمع السكان حول الذكرى والاحتفال.
          </p>
        </Card>
        <Card title="الأساطير المحلية">
          <p className="leading-relaxed">
            يرتبط موقع <strong>إمي نيفري</strong> بأسطورة "خطاف العرائس"، كائن خرافي يُقال إنه يسكن المغارة،
            وكانت القبائل تقدم له قرباناً سنوياً. كما تروى حكايات عن "البردقيز" سكان المغارات القدماء.
          </p>
        </Card>
      </div>
    </div>
  );
}

function NatureTab() {
  return (
    <div className="space-y-6">
      <SectionTitle>الطبيعة والبيئة في دمنات ومحيطها</SectionTitle>
      <Paragraph>
        تتموقع دمنات في منطقة انتقالية بين سهل الحوز الخصيب وجبال الأطلس العالي، مما يمنحها تنوعاً بيئياً
        وجيولوجياً فريداً. وتحيط بها غابات الزيتون واللوز، والوديان العميقة، والقمم الجبلية، والينابيع
        الدائمة.
      </Paragraph>

      <div className="grid gap-6 md:grid-cols-2">
        <Card title="واد محاصر" image="/images/imi-n-ifri.jpg">
          <p className="leading-relaxed">
            نهر دائم الجريان يخترق منخفض دمنات، وكان يحمل في الماضي اسم "البحيرة" لكثرة مياهه. يتغذى من
            عيون محلية ويمر بجسر إمي نيفري الطبيعي.
          </p>
        </Card>
        <Card title="الينابيع والعيون">
          <p className="leading-relaxed">
            من أشهرها <strong>عين سدي وكريان</strong> التي يُعتقد أن مياها تنفع للمعدة، و<strong>عين سيدي أبو البخت</strong>
            المستخدمة لأمراض الجلد، و<strong>عين محاصر</strong> المرتبطة بالتقاليد الشعبية.
          </p>
        </Card>
        <Card title="آثار الديناصورات">
          <p className="leading-relaxed">
            بالقرب من إمي نيفري توجد بصمات ديناصورات محفوظة في الصخور الحمراء، تُشكّل موقعاً جيولوجياً
            وسياحياً مهماً للباحثين والزوار.
          </p>
        </Card>
        <Card title="غار الملح">
          <p className="leading-relaxed">
            منجم ملح قديم في منطقة تيزغت، استُغل منذ زمن بعيد بفضل ظهور الملح على جوانب واد تعلا،
            لكنه توقف عن العمل لاحقاً بسبب نزاعات عمالية.
          </p>
        </Card>
        <Card title="بساتين الزيتون واللوز">
          <p className="leading-relaxed">
            تحيط بدمنات بساتين كثيفة من الزيتون المعمر، وبعضها يرجع أصله إلى القيروان بتونس حسب الرواية
            الشعبية. وتُنتج المنطقة زيت زيتون عالي الجودة واللوز والجوز.
          </p>
        </Card>
        <Card title="التنوع الحيواني">
          <p className="leading-relaxed">
            تتخذ طيور البلشون (البلارج) من أسوار دمنات مقراً للتعشيش والتكاثر، مما يضفي على المدينة قيمة
            بيئية إضافية تستحق الحماية.
          </p>
        </Card>
      </div>
    </div>
  );
}

function SocietyTab() {
  return (
    <div className="space-y-6">
      <SectionTitle>المجتمع والاقتصاد</SectionTitle>
      <Paragraph>
        المجتمع الدمناتي مجتمع أمازيغي في جوهره، محافظ على تقاليده وقيمه، من مبدأ كرامة الضيافة،
        وإكرام الضيف، والتضامن العائلي والقبلي. ومع ذلك، فإنه يواجه تحديات الهجرة والتمدن السريع.
      </Paragraph>

      <SubTitle>التطور الديموغرافي</SubTitle>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Fact label="1994" value="17,782 نسمة" />
        <Fact label="2004" value="23,459 نسمة" />
        <Fact label="2014" value="29,504 نسمة" />
        <Fact label="2024" value="33,635 نسمة" />
      </div>
      <Paragraph>
        يعكس النمو الديموغرافي توسعاً حضرياً تدريجياً، رغم أن المدينة ظلت محافظة على مقياسها المتوسط
        وبنيتها الاجتماعية المتماسكة.
      </Paragraph>

      <SubTitle>الاقتصاد</SubTitle>
      <ul className="list-inside list-disc space-y-2 text-slate-700">
        <li>
          <strong>الفلاحة:</strong> القطاع الأساسي، تعتمد على زراعة الزيتون والحبوب والخضروات، وتربية
          الماشية، بمساحة صالحة للزراعة تقدر بنحو 510 هكتارات.
        </li>
        <li>
          <strong>التجارة:</strong> سوق الخميس الأسبوعي هو قلب النشاط التجاري، بالإضافة إلى محلات المواد
          الغذائية والحرف التقليدية.
        </li>
        <li>
          <strong>السياحة:</strong> تملك دمنات ومحيطها إمكانات سياحية ضخمة (طبيعة، تاريخ، فلكلور)،
          لكنها لا تزال بحاجة إلى بنية تحتية وتسويق سياحي أفضل.
        </li>
        <li>
          <strong>الصناعة:</strong> محدودة، وتتركز في معاصر الزيتون والورشات الصغيرة، بينما تظل الحرف
          التقليدية هي السائدة.
        </li>
      </ul>

      <SubTitle>دمنات اليوم</SubTitle>
      <Paragraph>
        اليوم، تسعى دمنات إلى إعادة الاعتبار لتراثها المادي واللامادي، عبر عمليات ترميم للسور والقصبة،
        وتطوير السياحة البيئية والثقافية، والحفاظ على الحرف التقليدية. وتبقى المدينة نموذجاً حياً للتعايش
        بين السهل والجبل، وبين الماضي والحاضر.
      </Paragraph>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('intro');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView(DEMNATE_CENTER, 13);

    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> مساهمو',
      maxZoom: 19,
    });

    const satellite = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 18,
      }
    );

    const topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data: &copy; OpenStreetMap, SRTM | Map style: &copy; OpenTopoMap',
      maxZoom: 17,
    });

    osm.addTo(map);

    L.control.layers(
      {
        'خريطة الطرقات': osm,
        'صور فضائية': satellite,
        'طبوغرافيا': topo,
      },
      {},
      { collapsed: true, position: 'topright' }
    ).addTo(map);

    L.control.scale({ metric: true, imperial: false }).addTo(map);

    const centerMarker = L.marker(DEMNATE_CENTER, { icon: createPinIcon('#ef4444') })
      .addTo(map)
      .bindPopup(
        '<b>وسط مدينة دمنات</b><br>قلب المدينة التاريخي ونقطة الانطلاق لاستكشاف المنطقة.'
      );
    markersRef.current.center = centerMarker;

    L.circle(DEMNATE_CENTER, {
      radius: 1800,
      color: '#ef4444',
      weight: 1,
      fillColor: '#ef4444',
      fillOpacity: 0.08,
    }).addTo(map);

    const imiMarker = L.marker(IMI_N_IFRI, { icon: createPinIcon('#10b981') })
      .addTo(map)
      .bindPopup(
        '<b>جسر إمي نيفري الطبيعي</b><br>جسر صخري طبيعي رائع على بعد حوالي 6 كم جنوب دمنات.'
      );
    markersRef.current.imi = imiMarker;

    const ouzoudMarker = L.marker(OUZOUD_FALLS, { icon: createPinIcon('#3b82f6') })
      .addTo(map)
      .bindPopup(
        '<b>شلالات أوزود</b><br>من أجمل شلالات المغرب، على بعد نحو 70 كم شمال شرق دمنات.'
      );
    markersRef.current.ouzoud = ouzoudMarker;

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, []);

  const flyTo = (key: 'center' | 'imi' | 'ouzoud', zoom: number) => {
    const map = mapRef.current;
    const marker = markersRef.current[key];
    if (!map) return;

    const coords =
      key === 'center' ? DEMNATE_CENTER : key === 'imi' ? IMI_N_IFRI : OUZOUD_FALLS;
    map.flyTo(coords, zoom, { duration: 1.5 });
    marker?.openPopup();
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="bg-emerald-700 text-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-6">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">demnatna.com</h1>
            <p className="mt-1 text-emerald-100">
              دليل شامل لمدينة دمنات (إقليم أزيلال) - جغرافيا، تاريخ، عمران، تراث، ومعالم.
            </p>
          </div>
          <div className="hidden rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold sm:block">
            المغرب
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 p-4 md:p-6">
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="relative h-[420px] overflow-hidden rounded-2xl border border-slate-200 shadow-lg lg:col-span-2 lg:h-[520px]">
            <div ref={mapContainerRef} className="absolute inset-0 z-0 h-full w-full" />
          </div>

          <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900">نبذة سريعة</h2>
            <div className="grid grid-cols-2 gap-3">
              <Fact label="المنطقة" value="بني ملال - خنيفرة" />
              <Fact label="الإقليم" value="أزيلال" />
              <Fact label="السكان (2024)" value="33,635" />
              <Fact label="الارتفاع" value="~950 م" />
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              دمنات مدينة أطلسية تاريخية، كانت مركزاً تجارياً يربط السهل بالجبل والصحراء، ولا تزال
              تحتفظ بقصبتها وأسوارها وملاحها اليهودي القديم.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => flyTo('center', 14)}
                className="rounded-lg bg-emerald-700 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-emerald-800"
              >
                وسط المدينة
              </button>
              <button
                onClick={() => flyTo('imi', 15)}
                className="rounded-lg bg-emerald-700 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-emerald-800"
              >
                إمي نيفري
              </button>
              <button
                onClick={() => flyTo('ouzoud', 13)}
                className="rounded-lg bg-emerald-700 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-emerald-800"
              >
                شلالات أوزود
              </button>
            </div>
          </aside>
        </section>

        <nav className="sticky top-0 z-20 -mx-4 border-b border-slate-200 bg-slate-50/95 px-4 py-3 backdrop-blur md:mx-0 md:rounded-2xl md:border md:px-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                  activeTab === tab.key
                    ? 'bg-emerald-700 text-white shadow'
                    : 'bg-white text-slate-700 hover:bg-emerald-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg md:p-8">
          {activeTab === 'intro' && <IntroTab />}
          {activeTab === 'history' && <HistoryTab />}
          {activeTab === 'urban' && <UrbanTab />}
          {activeTab === 'landmarks' && <LandmarksTab />}
          {activeTab === 'heritage' && <HeritageTab />}
          {activeTab === 'nature' && <NatureTab />}
          {activeTab === 'society' && <SocietyTab />}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-slate-900">مصادر ومراجع</h2>
          <ul className="list-inside list-disc space-y-1 text-sm text-slate-600">
            <li>أحمد التوفيق، دراسات في تاريخ المدن المغربية.</li>
            <li>محمد أبحير ومركز أعلام دمنات للدراسات المجالية.</li>
            <li>مواقع: مغرس (أزيلال أون لاين)، هسبريس، أطلس سكوب، مدن المغرب.</li>
            <li>بيانات السكان: citypopulation.de / الإحصائيات الرسمية المغربية.</li>
            <li>بيانات الخريطة: © OpenStreetMap contributors.</li>
          </ul>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-sm text-slate-500">
        <span className="font-semibold text-emerald-700">demnatna.com</span> - دليل تفاعلي لمدينة دمنات - بيانات OpenStreetMap
      </footer>
    </div>
  );
}
