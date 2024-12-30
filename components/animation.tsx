import { motion } from 'framer-motion'

export default function Animation({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0 }} // 初期状態
            animate={{ opacity: 1 }} // マウント時
            exit={{ opacity: 0 }}    // アンマウント時
            transition={{ duration: 1 }} // アニメーションの持続時間を1秒に設定
        >{children}</motion.div>
    );
}