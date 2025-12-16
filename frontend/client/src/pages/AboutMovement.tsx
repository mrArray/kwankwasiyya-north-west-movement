import React from "react";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Link } from "wouter";

const AboutMovement: React.FC = () => (
  <div className="min-h-screen bg-background">
    {/* Navigation */}
    <nav className="border-b bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <img src={APP_LOGO} alt={APP_TITLE} className="h-10 w-10 rounded-full object-cover" />
          <span className="text-lg font-bold text-primary">{APP_TITLE}</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/verify">Verify ID</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/about-movement">Munufar Kungiya</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register Now</Link>
          </Button>
        </div>
      </div>
    </nav>
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: "2rem", background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
    <h1 style={{ textAlign: "center", color: "#c00" }}>Munufar Kungiyar Kwankwasiyya Northwest Movement</h1>
    <ol style={{ marginBottom: "2rem" }}>
      <li>Wayarwa da mutane kai akan mahimmancin Katin Zabe ga Wadanda Shekarunsu suka isa Yin zabe da Kuma Wadanda ba Suyi ba Abaya, tare da Iliminatar dasu amfanin yin zabe.</li>
      <li>Fahimtar da jama'a Musamman Matasa Akan Yadda Zasu Kare Kuri'arsu Bayan Gama Zabe.</li>
      <li>Wayarwa da al-umma akan Sani logan jam’iyya NNPP</li>
      <li>Cigaba da Shigo da Jama'a cikin Tsari kwankwasiyya Lungu da Sako na. Wannan Jahoyi.</li>
      <li>Jadddawa Magoya Bayan kan Tsayawa Akan Akida Duku Wuya duk Tsanani</li>
      <li>Yin biyayya ga Umarnin Jagora Engr. Dr. Rabi'u Musa Kwankwaso Aduk Wani Hukunci da Yayi Domin Zama Masu Tsari da Ban Sha'awa a Wannan Tafiya.</li>
      <li>Ci Gaba da Yada Munufar Kwankwasiyya da fahimtar da jama’a maya akida Kwankwasiyya</li>
    </ol>
    <h2 style={{ color: "#c00" }}>Makadudun Kafa Kungiyar Kwankwasiyya Northwest Movement da Burinta a Zaben 2027</h2>
    <p>Bayan Kammala Zaben Shugaban Kasa na 2023 nayi nazari da duba akan wasu abubawa da Suka faru, mun Sami Labari da tuntuba gama da matsala da muka Samu a akwatuna zuwa mazaba da Local Government dan haka naga mahimmanci tare da dacewar Samar da Wata Kurgiya wacce Zatayi aiki domin bada gudummawa wajen gyara Kura-Kuran da Suka Zamar Mana Sanadiyyar kwace Mana Nasara a wasu guraran da muka Samu a Zaben Shugaban Kasa.</p>
    <p>Wannan Kungiya za tayi aiki ne tare da ragowar Kungiyoyin Kwankwasiyya da yan kishin Kasa domin Kare Kuri’unmu a Zaben Shekara 2027 Insha Allah.</p>
    <p>Wannan buri na Kungiya ba zai Sami Cikakken Nasara ba sai an Sami Kulawa da Jajircewar na Jagorori tun daga akwatuna mazaba Karamar hukuma zuwa Jaha domin babbar nasara a tsarin mu na kwankwasiyya. Bayan addu'a Shine Biyayya ga Jagoranci da yin aiki tukuru.</p>
    <h3 style={{ color: "#c00" }}>Hanyoyin da mu keso mubi domin Samun nasara burin Wannan Kungiya Sune Kamar haka:</h3>
    <ol>
      <li>
        <strong>Mallakar Katin Zabe:</strong> Lallaine duk masoyin Kwankwasiyya da kuma yan Kishin Kasa su zama Suna da Katin zabe domin babban burin Jam’iyya Shine Kafa gwamnati ita kuma gwamnati ana kаfа tane ta hanyar Zabe Shi kuma Zabe ana yin Sane da katin Zabe don haka Mallakar Katin Zabe nada matukar muhimmanci domin Kafa gwamnatin Kwankwasiyya a Kasa ya Zama wajibi ka tabbertar wanda yaki yin Katin Zabe a baya ko maye dalilinsa yaran da a baya Shekarun sa basu kai (“18") bа maza da Mata a binciko su domin mafi yawan Su ra'ayi kwankwasiyya Sukeyi dama duk Wanda ka isa dashi asa Suyi Katin Zabe ta hanyar jan hankall rarrashi, tursasawa da duk Wata hanya da ake bi domin Samun biyan bukata da mutam yake da ita A fahim tata yawan magoya baya a wajen Zabe matakin farkone na hana magudin Zabe.
      </li>
      <li>
        <strong>Rashin Kin Fita Zabe:</strong> Wata matsala mai girma itace Kin Fita zabe da wasu ke yi kuma suna da yawan gaske za kaga mutum ya Zauna a gida ko majalisa ranar zabe bisa dalilai daban-daban... irin wadannan mutanan yakamata a fahimtar dasu cewa gudanmawar da Zasu bayar itace bayan futowa Zabe su futo da Mata yaya da abokan arziki Kuma asa su Zabe NNPP Kwankwasiyya Su Kuma Matasa a Wayar da Kansu Cewa ranar Zabe ba maganar ball ba zama a gida su tabbater Sun Sadaukar da ranar domin ganin an Kafa gwamnatin da zata tallafawa iliminsu, Lafiyar su da tsaron su da Kuma inganta rayuwar Su Wannan Kungiya Zata fahimtar da Matasa mata da maza gani Sun fito su bada gudunmawa da za’a ayi alfahari dasu.
      </li>
      <li>
        <strong>Matsalar Takara Cikini Gida:</strong> Kamar yadda muka Sani shi neman Matsayi a Cikin Jam'iyya halasne ba laifi bane amma da Zarar anyi hukunci aka tabbator da dan takara to daga ranar Zaka Cigaba da tallata Jam’iyya don hakama a takardar Zabe alamar jam’iyya ake Sakawa ba Sunan Mutum ba yakamata yan jam’iyya su sani cewa jam’iyya ake bi ba jam’iyya ce zata bika ba dan haka waji bine kabi umarni Shugabancin daya tabbatar da wannaan dan takara Shine muke So Mu Sami hadin Kai domin nasara NNPP a Kasa baki daya ka tuna taken mu Shine kwankwasiyya Amana, Amana Sai dan amana.
      </li>
      <li>
        <strong>Rashin Kare Nasarmu:</strong> A Zaben Shugaban Kasa Na 2023 Mun Kasa Mun tsare a wasu gurun amma a wasu gurun bama Kasa ba Zakaga bamu da Agent ya zama wajibi mu Kare Kuriunmu Idan munyi nasara ko ba muyi ba Idan an Kadama to mutsaya muga lya Kayen da aka yi Mana aka Shigar Cikm Sakamakon zaben wajibi ne Kuma hakkine babba akan mu yakamata a Kara Wayarwa da ma goya baya aikin da za suyi a ranar Zabe Su sa Ido daga Lokacin da aka futo zabe har a jefa Kuria har agama a Kidayawa a Kowace akwatu har Zawa Matattara ta mazaba har L.G Zuwa Jaha ayi hakuri da bacci domin Samun bacci Mai dadi na Shekara hudu mu tsare nasarmu a Shekara 2027 da yardar Allah Jagorani da Shugabani da yan kishin kasa waji bine hakkine babba akan mu da Jama’a zasu dora a hannun mu na Zaben Kwankwasiyya ya Zama waji bi Sai Kunyi hakuri Kun jira Sai Kun Yarda kun bawa tafiyar nan ta Kwankwasiyya lokaci Zabe har a Fadi Sakamakon Zabe tun daga AKAWATU MAZABA LG. JAHA Sai an yarda aiki Za’a tsaya a yiwa tafiyar Kwankwasiyya Wannan aikin domin Samun nasara a wannnan Jahohin an Samu matsala daga Shugabani Jam’iyya wadda matsalar Su ta bawa Jam’iyyar matsala a wannan jahohi Fatan wannan Kungiya Zata tsaya ta yi. tsare dan Samin nasara a wannan Jahohi
      </li>
      <li>
        <strong>Tafarkin da Zamu Bi na Aikin Kungiya:</strong> Gyara duk Wata matsala da Muka Samu а zabe Shugaban Kasa tun daga akwatu Zuwa mazaba L.G. Jaha Shigo da Jama’a cikin tsaren Kwankwasiyya Lungu da Sako na wannan Jahohi Mun Lura Kwankwasiyya tana da magoya baya muna So mu hada kan su burin Wannan Kungiya a Wannan jahohi Kwankwasiyya tafi kowace jam’iyya kuri’a fatan mu a 2027. NNPP teyi nasara a Wannan Jahoni ta mallaki su ya zama Jagora Eng. Dr. Rabiu Masa Kwankwaso yadda Kano Suke yi Masa Kara Suma Suyi masa ya Zamo Maganar Sa ake zamu kafa tsare na wayar da kai Jama’a a gidajin raido akan Manafofin Kwankwasiyya da yin tsare na samo Kuria da Shigo da Masu hali cikin Kwankwasiyya da duk Wanda Yakamate mu Kaiwa Ziyara Allah ya taimaki tsaren kwankwasiyya tun daga sama har kasa nagode naku Hon. Kabru Maraska Dala. Chairman Kwankwasiyya Northwest Movement
      </li>
    </ol>
    </div>
  </div>
);

export default AboutMovement;