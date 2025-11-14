# Sneat Dashboard 克隆项目 - 技术架构文档

## 1. Architecture design

```mermaid
graph TD
    A[用户浏览器] --> B[React 前端应用]
    B --> C[Vite 开发服务器]
    B --> D[MongoDB Atlas API]
    B --> E[Vercel 部署平台]

    subgraph "前端层"
        B
        F[React Router]
        G[Tailwind CSS]
        H[Chart.js/Recharts]
        I[Socket.io Client]
    end

    subgraph "构建工具"
        C
        J[ESLint]
        K[Prettier]
    end

    subgraph "数据层"
        D
        L[MongoDB Collections]
        M[Mongoose ODM]
    end

    subgraph "部署层"
        E
        N[CDN]
        O[环境变量]
    end

    B --> F
    B --> G
    B --> H
    B --> I
    D --> L
    D --> M
```

## 2. Technology Description

- **前端**: React@18 + TypeScript + Tailwind CSS@3 + Vite@4
- **状态管理**: Zustand (轻量级状态管理)
- **图表库**: Chart.js + React-Chartjs-2 (数据可视化)
- **UI组件**: Headless UI + Heroicons (无样式组件库)
- **实时通信**: Socket.io-client (聊天功能)
- **数据库**: MongoDB Atlas (云数据库服务)
- **ODM**: Mongoose (MongoDB 对象文档映射)
- **部署**: Vercel (前端部署平台)

## 3. Route definitions

| Route | Purpose |
|-------|---------|
| / | 重定向到 /login 或 /dashboard/analytics |
| /login | 用户登录页面，支持邮箱密码和社交登录 |
| /register | 用户注册页面，包含邮箱验证流程 |
| /dashboard/analytics | Analytics 仪表板，显示业务数据分析 |
| /dashboard/crm | CRM 仪表板，客户关系管理界面 |
| /dashboard/ecommerce | eCommerce 仪表板，电商数据统计 |
| /apps/email | Email 应用，邮件收发和管理 |
| /apps/email/:id | 邮件详情页面，显示单封邮件内容 |
| /apps/chat | Chat 应用，实时聊天界面 |
| /apps/calendar | Calendar 应用，日程管理功能 |
| /profile | 用户个人资料页面，账户设置 |
| /404 | 404 错误页面，页面未找到提示 |

## 4. API definitions

### 4.1 Core API

用户认证相关
```
POST /api/auth/login
```

Request:
| Param Name| Param Type  | isRequired  | Description |
|-----------|-------------|-------------|-------------|
| email     | string      | true        | 用户邮箱地址 |
| password  | string      | true        | 用户密码 |

Response:
| Param Name| Param Type  | Description |
|-----------|-------------|-------------|
| success   | boolean     | 登录是否成功 |
| token     | string      | JWT 访问令牌 |
| user      | object      | 用户基本信息 |

Example
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

仪表板数据获取
```
GET /api/dashboard/analytics
```

Response:
| Param Name| Param Type  | Description |
|-----------|-------------|-------------|
| revenue   | object      | 收入统计数据 |
| users     | object      | 用户增长数据 |
| orders    | object      | 订单统计信息 |
| charts    | array       | 图表数据集合 |

邮件管理
```
GET /api/emails
POST /api/emails
PUT /api/emails/:id
DELETE /api/emails/:id
```

聊天消息
```
GET /api/messages/:chatId
POST /api/messages
```

日历事件
```
GET /api/events
POST /api/events
PUT /api/events/:id
DELETE /api/events/:id
```

## 5. Server architecture diagram

```mermaid
graph TD
    A[React 前端应用] --> B[API 路由层]
    B --> C[业务逻辑层]
    C --> D[数据访问层]
    D --> E[(MongoDB Atlas)]

    subgraph "前端应用"
        A
        F[组件层]
        G[状态管理]
        H[路由管理]
    end

    subgraph "API 服务"
        B
        I[认证中间件]
        J[数据验证]
        K[错误处理]
    end

    subgraph "业务逻辑"
        C
        L[用户服务]
        M[仪表板服务]
        N[邮件服务]
        O[聊天服务]
    end

    subgraph "数据层"
        D
        P[Mongoose 模型]
        Q[数据库连接]
    end

    A --> F
    A --> G
    A --> H
    B --> I
    B --> J
    B --> K
    C --> L
    C --> M
    C --> N
    C --> O
    D --> P
    D --> Q
```

## 6. Data model

### 6.1 Data model definition

```mermaid
erDiagram
    USER ||--o{ EMAIL : sends
    USER ||--o{ MESSAGE : sends
    USER ||--o{ EVENT : creates
    USER ||--o{ ORDER : places
    
    USER {
        string id PK
        string email
        string password_hash
        string name
        string avatar_url
        string role
        date created_at
        date updated_at
    }
    
    EMAIL {
        string id PK
        string user_id FK
        string subject
        string content
        string recipient
        boolean is_read
        date sent_at
    }
    
    MESSAGE {
        string id PK
        string sender_id FK
        string receiver_id FK
        string content
        string chat_room
        date created_at
    }
    
    EVENT {
        string id PK
        string user_id FK
        string title
        string description
        date start_date
        date end_date
        string color
    }
    
    ORDER {
        string id PK
        string user_id FK
        number total_amount
        string status
        date order_date
        json items
    }
    
    ANALYTICS {
        string id PK
        date date
        number revenue
        number users_count
        number orders_count
        json metrics
    }
```

### 6.2 Data Definition Language

用户表 (users)
```javascript
// MongoDB Collection Schema
const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  name: { type: String, required: true },
  avatar_url: { type: String, default: '' },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// 创建索引
userSchema.index({ email: 1 });
userSchema.index({ created_at: -1 });
```

邮件表 (emails)
```javascript
const emailSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  recipient: { type: String, required: true },
  is_read: { type: Boolean, default: false },
  sent_at: { type: Date, default: Date.now }
});

emailSchema.index({ user_id: 1, sent_at: -1 });
```

消息表 (messages)
```javascript
const messageSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  chat_room: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

messageSchema.index({ chat_room: 1, created_at: -1 });
```

事件表 (events)
```javascript
const eventSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  color: { type: String, default: '#696CFF' }
});

eventSchema.index({ user_id: 1, start_date: 1 });
```

订单表 (orders)
```javascript
const orderSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total_amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  order_date: { type: Date, default: Date.now },
  items: { type: Array, default: [] }
});

orderSchema.index({ user_id: 1, order_date: -1 });
orderSchema.index({ status: 1 });
```

分析数据表 (analytics)
```javascript
const analyticsSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  date: { type: Date, required: true, unique: true },
  revenue: { type: Number, default: 0 },
  users_count: { type: Number, default: 0 },
  orders_count: { type: Number, default: 0 },
  metrics: { type: Object, default: {} }
});

analyticsSchema.index({ date: -1 });
```

初始化数据
```javascript
// 创建默认管理员用户
db.users.insertOne({
  email: "admin@sneat.com",
  password_hash: "$2b$10$...", // bcrypt 加密后的密码
  name: "系统管理员",
  role: "admin",
  created_at: new Date(),
  updated_at: new Date()
});

// 插入示例分析数据
db.analytics.insertMany([
  {
    date: new Date('2024-01-01'),
    revenue: 125000,
    users_count: 1250,
    orders_count: 450,
    metrics: {
      conversion_rate: 3.6,
      avg_order_value: 278,
      bounce_rate: 42.5
    }
  }
]);
```