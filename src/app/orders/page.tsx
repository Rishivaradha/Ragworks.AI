"use client";
import { useSearchParams } from "next/navigation";
import { useShopStore } from "@/store/useShopStore";

const STATUS_LABELS: Record<string, string> = {
  processing: "Order Placed",
  shipped: "Packed",
  out_for_delivery: "Shipped", 
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const ORDER_STEPS = ["processing", "shipped", "out_for_delivery", "delivered"];

function OrderTracker({ status }: { status: string }) {
  const currentStepIndex = ORDER_STEPS.indexOf(status);
  
  return (
    <div className="py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200">
          <div 
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${(currentStepIndex / (ORDER_STEPS.length - 1)) * 100}%` }}
          />
        </div>
        
        {ORDER_STEPS.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isActive = index === currentStepIndex;
          
          return (
            <div key={step} className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                isCompleted 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
              </div>
              <div className={`mt-2 text-xs text-center font-medium ${
                isActive ? 'text-green-600' : isCompleted ? 'text-green-500' : 'text-gray-400'
              }`} style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {STATUS_LABELS[step]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const params = useSearchParams();
  const placed = params.get("placed");
  const { orders } = useShopStore();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold dot-matrix mb-2">Order History</h1>
        <p className="text-gray-600" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Track your orders
        </p>
      </div>

      {placed && (
        <div className="card p-4 bg-green-50 border-green-200">
          <div className="text-green-800 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            ✅ Order placed successfully! ID: {placed}
          </div>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-lg text-gray-500 mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            No orders yet
          </div>
          <div className="text-sm text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Start shopping to see your orders here
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-semibold text-lg" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Order #{o.id.slice(-8)}
                  </div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {new Date(o.createdAt).toLocaleDateString()} at {new Date(o.createdAt).toLocaleTimeString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    o.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    o.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    o.status === 'out_for_delivery' ? 'bg-yellow-100 text-yellow-800' :
                    o.status === 'processing' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`} style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {STATUS_LABELS[o.status]}
                  </div>
                </div>
              </div>

              {/* Order Progress Tracker */}
              <OrderTracker status={o.status} />
              
              <div className="space-y-2 mb-4">
                {o.items.map((it) => (
                  <div key={it.productId} className="flex items-center justify-between text-sm">
                    <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {it.productName || `Product ${it.productId}`} × {it.quantity}
                    </span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      ₹{(it.totalAmount || 0).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-lg font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Total: ₹{(o.total || 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {o.items.length} item{o.items.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


