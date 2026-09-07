import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Sparkles, Star, Send, CheckCircle2, RefreshCw, Trash2 } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
  date: string;
}

export const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Form state
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error('Failed to fetch real-time reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    const interval = setInterval(fetchReviews, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, role, content, rating }),
      });

      if (res.ok) {
        const newReview = await res.json();
        setReviews((prev) => [newReview, ...prev].slice(0, 20));
        setAuthor('');
        setRole('');
        setContent('');
        setRating(5);
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000);
      }
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all reviews from the database?")) return;
    try {
      const res = await fetch('/api/reviews', { method: 'DELETE' });
      if (res.ok) {
        setReviews([]);
      }
    } catch (err) {
      console.error('Failed to delete reviews:', err);
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-200 dark:border-indigo-800/40">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Community Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
            Reviews
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            Leave your feedback directly below or check out what others are saying in real-time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Review Submission Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-900/60 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm shimmer-container"
          >
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Write a Review</h3>

            {successMessage ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3 animate-bounce" />
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white">Review Published Live!</h4>
                <p className="text-sm text-zinc-500 mt-1">Thank you for sharing your feedback.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Alex Turner"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Role / Server Name
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Owner, Heaven Realms"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        type="button"
                        key={star}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setRating(star)}
                        className={`p-1 transition-colors cursor-pointer ${rating >= star ? 'text-amber-500' : 'text-zinc-300 dark:text-zinc-700'}`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Review / Feedback *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your experience working with Sakshyam..."
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Publish Review</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Reviews List Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <span>Recent Reviews</span>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                  {reviews.length}
                </span>
              </h3>
              {reviews.length > 0 && (
                <button
                  onClick={handleDeleteAll}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-semibold text-xs border border-red-200 dark:border-red-900/50 hover:bg-red-100 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete All</span>
                </button>
              )}
            </div>

            {loading && reviews.length === 0 ? (
              <div className="flex justify-center items-center py-12 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
                <span className="ml-2 text-zinc-500 font-medium">Loading live reviews...</span>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-16 px-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                <Quote className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
                <h4 className="text-base font-bold text-zinc-900 dark:text-white">No reviews yet</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Be the first to write a review using the form!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                <AnimatePresence>
                  {reviews.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ y: -2 }}
                      className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-xs relative group hover:border-indigo-500/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(item.rating || 5)].map((_, s) => (
                            <Star key={s} className="w-3.5 h-3.5 fill-current animate-flash-glow" />
                          ))}
                        </div>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mb-4">
                        "{item.content}"
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-zinc-200/60 dark:border-zinc-800">
                        <div>
                          <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm">
                            {item.author}
                          </h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
