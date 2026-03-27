import Link from 'next/link';
import { Mechanic, getMechanicImageUrl } from '@/data/mechanics';
import RatingStars from './RatingStars';
import Badge from './Badge';

interface MechanicCardProps {
  mechanic: Mechanic;
}

export default function MechanicCard({ mechanic }: MechanicCardProps) {
  return (
    <Link 
      href={`/mechanics/${mechanic.id}`}
      className="group block overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm transition hover:shadow-lg"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={getMechanicImageUrl(mechanic, { w: 400, h: 250 })}
          alt={`${mechanic.name} - Classic Car Restoration`}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-display text-lg font-semibold text-slate-900 group-hover:text-[#c41e3a]">
            {mechanic.name}
          </h3>
          <div className="flex items-center gap-1 text-sm font-medium">
            <span className="text-slate-600">{mechanic.priceRange}</span>
          </div>
        </div>
        <p className="mb-3 text-sm text-slate-600">
          {mechanic.city}, {mechanic.state} • Founded {mechanic.yearFounded}
        </p>
        
        <div className="mb-3 flex items-center gap-2">
          <RatingStars rating={mechanic.rating} size="sm" />
          <span className="text-sm text-slate-500">({mechanic.reviewCount} reviews)</span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-slate-600">
          {mechanic.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1">
          {mechanic.specialties.slice(0, 3).map((specialty, index) => (
            <Badge key={index} variant="secondary" size="sm">
              {specialty}
            </Badge>
          ))}
          {mechanic.specialties.length > 3 && (
            <Badge variant="outline" size="sm">
              +{mechanic.specialties.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{mechanic.makes.slice(0, 2).join(', ')}{mechanic.makes.length > 2 ? '...' : ''}</span>
          <span>{mechanic.services.length} services</span>
        </div>
      </div>
    </Link>
  );
}