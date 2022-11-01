import { StatefulComponent } from '@involvemint/client/shared/util';
import { ImConfig, VerifyHandleQuery } from '@involvemint/shared/domain';
import { FormGroup } from '@ngneat/reactive-forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { HandleOrchestration } from './orchestrations';

export function verifyHandleUniqueness<
  F extends FormGroup<{ handle: string }>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  S extends StatefulComponent<any>
>(form: F, handleOrcha: HandleOrchestration, comp: S) {
  return form.valueChanges.pipe(
    map((f) => f.handle),
    distinctUntilChanged(),
    filter(() => form.controls.handle.valid),
    tap(() => comp['updateState']({ verifyingHandle: true })),
    debounceTime(ImConfig.formDebounceTime),
    switchMap((handle) => handleOrcha.verifyHandle(VerifyHandleQuery, { handle })),
    tap(({ isUnique }) => {
      form.controls.handle.setErrors(isUnique ? null : { notUnique: true });
      comp['updateState']({ verifyingHandle: false });
    })
  );
}
