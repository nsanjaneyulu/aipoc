import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'characterCutter',
  standalone: true
})
export class CharacterCutterPipe implements PipeTransform {

  transform(value: string, charToTrim: string = ' ', maxLength: number = 100): string {
    if (!value) return '';

    // Trim specified characters from the start and end
    const trimmedValue = value.split(charToTrim).join(' ').trim();

    // Add ellipsis if the trimmed string exceeds max length
    return trimmedValue.length > maxLength ? `${trimmedValue.substring(0, maxLength)}...` : trimmedValue;
  }

}
