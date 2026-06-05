# 🌿 Plant Steward | 植物管家

[English]
A hardcore, minimalist, single-file PWA (Progressive Web App) designed for plant hackers, tech-savvy growers, and DIY electronics enthusiasts who demand full control over their indoor and outdoor botanical data.

[中文]
一款面向独立开发者、植物极客与硬件 DIY 爱好者的硬核、极简单文件 PWA 植物养护与光照计算工具。

![](https://img.shields.io/badge/Architecture-Vanilla__JS-green?style=flat-sync)
![](https://img.shields.io/badge/Deployment-Single__File-blue?style=flat-sync)
![](https://img.shields.io/badge/PWA-Supported-orange?style=flat-sync)

---

## 💡 Why This Tool Exists | 为什么做这个软件？

* **[English]** Most plant care apps are bloated, filled with social ads, and treat plant care as a "guessing game." This app cuts through the noise, approaching plant care from a strict **plant physiology perspective (DLI & PPFD)**. Built entirely with pure **Vanilla JS + CSS variables** in a single HTML file, it runs with millisecond response times and zero framework overhead.
* **[中文]** 市面上的植物养护 App 大多臃肿、充满社交广告，且极少能从**植物生理学核心光质指标（DLI / PPFD）**的本质出发来指导养护。本项目本着“理性、深入事物本质”的原则，拒绝一切重型框架，使用纯原生 Vanilla JS + CSS 变量打造。单 HTML 文件即可跑完所有逻辑，首屏加载达到毫秒级。

---

## 🚀 Key Features | 核心亮点

### 1. ☀️ Solar & Grow Light DLI Integrator | 太阳辐射与补光灯 DLI 积分器
* **[English] Outdoor Solar Model**: Built-in monthly historical solar baseline adjusted for specific geographic coordinates (e.g., New York, 40.7°N) using a custom variation of the **Duffie & Beckman solar model**. Users can select a specific daytime interval to calculate the outdoor clear-sky DLI limit via **sinusoidal integration**, avoiding coarse linear estimations.
* **[中文] 户外日照估算模型**：内置基于特定地理维度（预置为纽约 40.7°N）的历史太阳辐射基准数据。通过选择月份和输入直射时段，利用**正弦定积分算法**精准抠出该时段内太阳直射落下的 DLI（每日光照积分）晴天上限，拒绝粗暴的线性相乘。
* **[English] Grow Light Converter**: Seamlessly translates light intensity from `LUX → PPFD → DLI` based on customizable full-spectrum LED quantum conversion coefficients, enabling precision under-volting/dimming strategies for maximum energy ROI.
* **[中文] 补光灯精准换算**：支持自定义全光谱 LED 转换系数，实现测量点从 `LUX → PPFD → DLI` 的链条式换算，完美辅助补光灯矩阵的降压/调压等高性价比 DIY 策略。

### 2. 📖 Data-Driven Botanical Database | 结构化植物生理数据库
* **[English]** Built-in scientific reference guidelines for nearly 40 herbs, vegetables, and foliage plants (e.g., *Mentha spicata*, *Ocimum basilicum*). Clearly defines **Optimal PPFD**, **Minimal Survival PPFD**, and targeted **Daily Light Integral (DLI)** safe ranges to remove the guesswork from seasonal supplemental lighting.
* **[中文]** 内置近 40 种香草蔬菜（如绿薄荷、罗勒）及常见观叶植物的生理学参数。清晰标注每种植物的**推荐 PPFD**、**最低存活 PPFD** 以及**安全 DLI 范围**，用纯数据指导种植，告别玄学养花。

### 3. 📅 Frictionless Care Dashboard | 极简养护看板
* **[English]** Focused strictly on the two vital parameters: **Water (💧)** and **Fertilizer (🌿)**. Automatically triggers 3-stage visual alerts (Normal, Warning, Critical) based on elapsed time and dynamic plant traits.
* **[中文]** 仅聚焦于生存的两件核心本质：**水（💧）**与**肥（🌿）**。卡片会根据距离上次操作的时间，自动呈现三级状态预警（正常/警告/紧急），支持快速一键打卡。

### 4. 🔒 100% Privacy & Backups | 100% 数据隐私与物理备份
* **[English]** **Zero Cloud Tracking**: All operational data resides purely inside the local browser sandbox (`LocalStorage`). Supports structured `.json` data exporting and overwriting. Your data belongs completely to you.
* **[中文]** **零云端跟踪**：无账号，数据完全落盘在本地 `LocalStorage`。内置一键结构化 `.json` 导出与覆盖导入功能，物理防丢，数据完全由自己掌控。

---

## 🛠️ Technical Details | 技术实现

* **[English] Aesthetics**: Cyber-botanical dark theme (`#1a2118` baseline) tailored meticulously for modern bezel-less mobile screens, with full padding protection for system overlay areas (`safe-area-inset`).
* **[中文] UI 风格**：精选极客感暗黑自然系配色（`#1a2118` 基调），全面适配现代手机全面屏的顶部与底部安全区（`safe-area-inset-bottom`）。
* **[English] Sinusoidal Formula Implemented**:
    The core algorithm integrates the solar radiation curve across the selected timeframe $[t_1, t_2]$:
* **[中文] 正弦积分公式实现**：
    对用户选定的直射时段 $[t_1, t_2]$ 内的太阳光辐射能进行区间定积分：

$$\text{DLI} = \int_{t_1}^{t_2} \text{noonPPFD} \cdot \sin\left(\frac{\pi \cdot (t - t_{\text{rise}})}{t_{\text{set}} - t_{\text{rise}}}\right) dt \times \frac{3.6}{1000}$$

---

## 📦 Getting Started | 如何使用

* **[English]**
    1. Clone or download this repository.
    2. Open `index.html` in any web browser.
    3. **One-Click PWA Deployment**: Turn on **GitHub Pages** in your repository settings, point it to the `main` branch, and visit the generated HTTPS link on your phone. Tap **"Add to Home Screen"** to install it as a standalone, offline-first native PWA experience.
* **[中文]**
    1. 克隆或下载本仓库代码。
    2. 在手机或电脑浏览器中直接双击打开 `index.html` 即可运行。
    3. **一键部署 PWA App**：进入本仓库的 Settings -> Pages，分支选择 `main` 并保存。大约 1 分钟后即可获得一个专属的 HTTPS 线上链接。在手机浏览器中打开该链接，点击**“添加到主屏幕”**，即可将其作为独立无边框的跨平台原生 App 离线使用！
