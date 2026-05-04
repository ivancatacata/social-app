import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../core/models/post.model';
import { AvatarComponent } from '../../../shared/components/avatar.component';
import { formatRelativeTime } from '../../../shared/utils/helpers';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  template: `
    <div class="flex gap-2.5">
      <app-avatar [initials]="comment.author.initials" size="sm"/>
      <div class="flex-1 min-w-0">
        <div class="bg-white/5 rounded-xl px-3 py-2">
          <span class="text-sm font-semibold text-white">
            {{ comment.author.name }}
          </span>
          <p class="text-sm text-slate-300 mt-0.5 leading-relaxed break-words">
            {{ comment.content }}
          </p>
        </div>
        <p class="text-xs text-slate-500 mt-1 ml-3">
          {{ relativeTime }}
        </p>
      </div>
    </div>
  `,
})
export class CommentComponent {
  @Input({ required: true }) comment!: Comment;

  get relativeTime(): string {
    return formatRelativeTime(this.comment.createdAt);
  }
}
